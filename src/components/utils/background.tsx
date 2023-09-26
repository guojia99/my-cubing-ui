export const SetBackGround = (src: string) => {
    const bg = document.querySelector('body') as HTMLBodyElement

    // bg.style.position = 'fixed'
    // bg.style.top = '0'
    // bg.style.left = '0'
    bg.style.width = '100%'
    // bg.style.height = '100%'
    bg.style.background = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${src}) no-repeat 0% 10%/ cover`
    // bg.style.backgroundImage = `url(${src})`
    // bg.style.backgroundSize = "cover"
    bg.style.backgroundAttachment = "fixed"
    // bg.style.backgroundRepeat = "no-repeat"
    bg.style.opacity = '0.85'
    bg.style.zIndex = "-99"
}