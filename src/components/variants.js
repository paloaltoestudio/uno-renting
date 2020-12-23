export const containerVariant = {
    hidden: {
        x:'5vw'
    },
    hiddenBack: {
        x:'-5vw'
    },
    visible: {
        x: 0,
        transition: { type: 'spring', stiffness: 90 }
    },
    exit: {
        x: '-5vw', 
        opacity: 0,
        transition: { ease: 'easeInOut' }
    },
    exitBack: {
        x: '5vw', 
        opacity: 0,
        transition: { ease: 'easeInOut' }
    }
}