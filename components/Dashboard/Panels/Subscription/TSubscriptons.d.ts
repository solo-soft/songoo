export type TSubscription = {
    id: string;
    userId: string;
    singer: {
        id: string;
        name: string;
        images: Array<{
            height: number;
            url: string;
            width: number;
        }>;
    };
    created_at: string;
    email: string;
};
