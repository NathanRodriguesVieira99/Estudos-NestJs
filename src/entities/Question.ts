import { randomUUID } from 'node:crypto';

export interface QuestionProps {
    id: string;
    title: string;
    slug: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Question implements QuestionProps {
    public id: string;
    public title: string;
    public slug: string;
    public content: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(
        props: Omit<QuestionProps, 'id' | 'createdAt' | 'updatedAt'>,
        id?: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.id = id || randomUUID();
        this.title = props.title;
        this.slug = props.slug;
        this.content = props.content;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
}
