//Dom elements
const menuIcon = document.querySelector('.menu-icon')
const cancelIcon = document.querySelector('.close-icon')
const sideBar = document.querySelector('aside')
const shade = document.querySelector('.shade')

menuIcon.addEventListener('click', (event) => {
    menuIcon.style.display = 'none'
    sideBar.style.display = 'flex'
    shade.style.display = 'block'
    cancelIcon.style.display = 'block'
    
})

cancelIcon.addEventListener('click', (event) => {
    cancelIcon.style.display = 'none'
    sideBar.style.display = 'none'
    shade.style.display = 'none'
    menuIcon.style.display = 'block'

})

shade.addEventListener('click', (event) => {
    cancelIcon.style.display = 'none'
    sideBar.style.display = 'none'
    shade.style.display = 'none'
    menuIcon.style.display = 'block'
})