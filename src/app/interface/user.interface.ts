interface User {
    id: string;
    label?: string;
    img?: string;
    imgUrl?: string;
    roles?: string[];
    groups?: string[];
    lastLogin?: Date;
}