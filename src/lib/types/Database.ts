import { Resource } from "@prisma/client";

export interface UserSingleOutput {
    resources: Resource[];
    preferences: {
        showResources: boolean;
    } | null;
    id: string;
    displayName: string | null;
    name: string | null;
    permissions: number | null;
    bannerColor: string | null;
    banner: string | null;
    image: string | null;
    bio: string | null;
}