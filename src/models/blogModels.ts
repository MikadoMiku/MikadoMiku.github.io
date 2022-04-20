import { ObjectId } from "mongodb";

export interface blogComment {
    _id?: ObjectId;
    content: string;
    createdBy: string;
    createdAt: string;
    postId: string;
}

export interface blogPost {
    // id: string; mongodb objectId?
    _id?: ObjectId;
    title: string;
    content: string;
    clicks: number;
    createdBy: string;
    createdAt: string;
}

export interface user {
    _id?: ObjectId;
    username: string;
    passwordHash: string;
    permissionLevel: number;
}

export interface feedback {
    _id?: ObjectId;
    content: string;
}
