import { Message, PermissionResolvable } from "discord.js";

export function permissionCheck(msg: Message, perm: PermissionResolvable): boolean {
    if (!msg.member.hasPermission(perm)) {
        return false;
    }

    return true;
}