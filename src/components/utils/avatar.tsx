export const Avatar = (src: string, name: string) => {
    return (
        <div style={{textAlign: "center"}}>
            <figure className="figure" style={{maxWidth: "300px", maxHeight: "300px"}}>
                <img src={src} className="figure-img img-fluid rounded" alt={name} style={{height:"100%"}}/>
                <figcaption className="figure-caption text-md-center">{name}</figcaption>
            </figure>
        </div>
    )
}