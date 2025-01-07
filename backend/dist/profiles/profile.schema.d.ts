import { Document } from 'mongoose';
export declare class Profile extends Document {
    username: string;
    city: string;
    bio?: string;
}
export declare const ProfileSchema: import("mongoose").Schema<Profile, import("mongoose").Model<Profile, any, any, any, Document<unknown, any, Profile> & Profile & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Profile, Document<unknown, {}, import("mongoose").FlatRecord<Profile>> & import("mongoose").FlatRecord<Profile> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
