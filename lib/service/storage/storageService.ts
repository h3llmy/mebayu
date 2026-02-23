import { api } from "@/lib/apiFetch/apiFetch";
import { BaseApiResponse } from "@/types";

export interface FileMetadata {
    content_type: string;
    file_name: string;
}

export interface GetPresignedUrlResponse {
    file_key: string;
    public_url: string;
    upload_url: string;
}

export class StorageService {
    /**
     * Step 1: Request presigned URLs
     */
    static async getPresignedUrl(
        metadata: FileMetadata[],
        path: string
    ): Promise<GetPresignedUrlResponse[]> {
        const response =
            await api.post<BaseApiResponse<GetPresignedUrlResponse[]>>(
                "/v1/storages/get-presign-url",
                {
                    metadata,
                    path,
                }
            );

        return response.data.data;
    }

    /**
     * Step 2: Upload file directly to S3/MinIO
     */
    static async uploadFileToPresignedUrl(
        uploadUrl: string,
        file: File
    ): Promise<void> {
        await fetch(uploadUrl, {
            method: "PUT",
            headers: {
                "Content-Type": file.type,
            },
            body: file,
        });
    }

    /**
     * Step 3: Complete flow helper (recommended)
     */
    static async uploadFiles(
        files: File[],
        path: string
    ): Promise<GetPresignedUrlResponse[]> {
        if (!files.length) return [];

        // Prepare metadata
        const metadata: FileMetadata[] = files.map((file) => ({
            content_type: file.type,
            file_name: file.name,
        }));

        // Get presigned URLs
        const presignedList = await this.getPresignedUrl(metadata, path);

        // Upload each file
        await Promise.all(
            presignedList.map((presigned, index) =>
                this.uploadFileToPresignedUrl(presigned.upload_url, files[index])
            )
        );

        return presignedList;
    }
}