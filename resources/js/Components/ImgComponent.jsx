
export default function Image({ auth, className = "" }) {
    const imageUrl = `/storage/img/avatarDefault.png`;
    const avatarUser = auth ? `/storage/img/${auth}` : imageUrl;



    return (
        <>
            <img className={className} src={avatarUser} alt="User Avatar" />
        </>
    );
}