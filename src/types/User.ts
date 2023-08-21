export default interface IUserData {
    id?: number,
    refreshToken: string,
    token: string,
    type: string,
    username: string,
    email: string,
    roles: Array<string>
}