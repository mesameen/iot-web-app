import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarBadge, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";

export default function CustomComponents() {
    return (
        <Card>
            <div className="">
                <h1>Share folder</h1>
                <span>Manage Who has access to these files</span>
                <label>Direct Link</label>
                <select>Can View</select>
                <input></input>
            </div>
            <div className="">
                <h2>Invite to Collaborate</h2>
                <span>Add team members by username or email</span>
                <input></input>
                <button>Invite</button>
                <ul>
                    <li className="flex">
                        <Avatar>
                            <AvatarImage
                                src={"https://github.com/shadcn.png"}
                                className="grayscale"
                            />
                            <AvatarBadge className="bg-green-600 dark:bg-green-800"></AvatarBadge>
                        </Avatar>
                        <span>sandeep@email.com</span>
                        <select></select>
                    </li>
                    <li className="flex">
                        <Avatar>
                            <AvatarImage
                                src={"https://github.com/shadcn.png"}
                                className="grayscale"
                            ></AvatarImage>
                        </Avatar>
                        <select></select>
                    </li>
                    <li className="flex">
                        <Avatar>
                            <AvatarImage
                                src={"https://github.com/shadcn.png"}
                                className="grayscale"
                            ></AvatarImage>
                        </Avatar>
                        <span>sandeep@email.com</span>
                        <select></select>
                    </li>
                </ul>
                <button>+ Create Group</button>
            </div>
            <div>
                <button>Copy Link</button>
                <button>Embed</button>
                <button>Done</button>
            </div>
        </Card>
    )
}