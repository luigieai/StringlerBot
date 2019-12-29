import * as Discord from "discord.js"

export function permissionCheck(discordMessageInstance: Discord.Message, permission: Discord.PermissionResolvable): boolean {
    if (!discordMessageInstance.member.hasPermission(permission)) {
        return false;
    }

    return true;
}