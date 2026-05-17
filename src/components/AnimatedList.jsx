import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'

const AnimatedItem = ({ children, delay = 0, index, onMouseEnter, onClick }) => {
    const ref = useRef(null)
    const inView = useInView(ref, { amount: 0.5, triggerOnce: false })

    return (
        <motion.div
            ref={ref}
            data-index={index}
            onMouseEnter={onMouseEnter}
            onClick={onClick}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.2, delay }}
            className="mb-4 cursor-pointer"
        >
            {children}
        </motion.div>
    )
}

const AnimatedList = ({
    items = [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
        'Item 5',
        'Item 6',
        'Item 7',
        'Item 8',
        'Item 9',
        'Item 10',
        'Item 11',
        'Item 12',
        'Item 13',
        'Item 14',
        'Item 15'
    ],
    onItemSelect,
    showGradients = true,
    enableArrowNavigation = true,
    className = '',
    itemClassName = '',
    displayScrollbar = true,
    initialSelectedIndex = -1,
    renderItem
}) => {
    const listRef = useRef(null)
    const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex)
    const [keyboardNav, setKeyboardNav] = useState(false)
    const [topGradientOpacity, setTopGradientOpacity] = useState(0)
    const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1)

    const handleItemMouseEnter = useCallback((index) => {
        setSelectedIndex(index)
    }, [])

    const handleItemClick = useCallback((item, index) => {
        setSelectedIndex(index)
        if (onItemSelect) {
            onItemSelect(item, index)
        }
    }, [onItemSelect])

    const handleScroll = useCallback((e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target
        setTopGradientOpacity(Math.min(scrollTop / 50, 1))
        const bottomDistance = scrollHeight - (scrollTop + clientHeight)
        setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1))
    }, [])

    useEffect(() => {
        if (!enableArrowNavigation) return

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
                e.preventDefault()
                setKeyboardNav(true)
                setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1))
            } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
                e.preventDefault()
                setKeyboardNav(true)
                setSelectedIndex((prev) => Math.max(prev - 1, 0))
            } else if (e.key === 'Enter') {
                if (selectedIndex >= 0 && selectedIndex < items.length) {
                    e.preventDefault()
                    if (onItemSelect) {
                        onItemSelect(items[selectedIndex], selectedIndex)
                    }
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [items, selectedIndex, onItemSelect, enableArrowNavigation])

    useEffect(() => {
        if (!keyboardNav || selectedIndex < 0 || !listRef.current) return

        const container = listRef.current
        const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`)
        if (selectedItem) {
            const extraMargin = 50
            const containerScrollTop = container.scrollTop
            const containerHeight = container.clientHeight
            const itemTop = selectedItem.offsetTop
            const itemBottom = itemTop + selectedItem.offsetHeight

            if (itemTop < containerScrollTop + extraMargin) {
                container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' })
            } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
                container.scrollTo({
                    top: itemBottom - containerHeight + extraMargin,
                    behavior: 'smooth'
                })
            }
        }

        setKeyboardNav(false)
    }, [selectedIndex, keyboardNav])

    return (
        <div className={`relative w-full ${className}`}>
            <div
                ref={listRef}
                className={`max-h-100 overflow-y-auto p-4 ${displayScrollbar
                    ? '[&::-webkit-scrollbar-track]:bg-[rgba(17,31,53,0.95)] [&::-webkit-scrollbar-thumb]:bg-(--tone-deep) [&::-webkit-scrollbar-thumb]:rounded-sm [&::-webkit-scrollbar-thumb]:hover:bg-(--tone-mint) [&::-webkit-scrollbar]:w-2'
                    : 'scrollbar-hide'
                    }`}
                onScroll={handleScroll}
                style={{
                    scrollbarWidth: displayScrollbar ? 'thin' : 'none',
                    scrollbarColor: 'var(--tone-deep) rgba(17,31,53,0.95)'
                }}
            >
                {items.map((item, index) => (
                    <AnimatedItem
                        key={item?._id ?? index}
                        delay={0.1}
                        index={index}
                        onMouseEnter={() => handleItemMouseEnter(index)}
                        onClick={() => handleItemClick(item, index)}
                    >
                        {renderItem ? (
                            renderItem(item, index, selectedIndex === index, itemClassName)
                        ) : (
                            <div className={`rounded-lg bg-[rgba(17,31,53,0.8)] p-4 ${selectedIndex === index ? 'bg-[rgba(138,36,75,0.9)]' : ''} ${itemClassName}`}>
                                <p className="m-0 text-(--tone-text)">{item}</p>
                            </div>
                        )}
                    </AnimatedItem>
                ))}
            </div>
            {showGradients && (
                <>
                    <div
                        className="pointer-events-none absolute left-0 right-0 top-0 h-12.5 bg-linear-to-b from-[rgba(17,31,53,0.98)] to-transparent transition-opacity duration-300 ease"
                        style={{ opacity: topGradientOpacity }}
                    />
                    <div
                        className="pointer-events-none absolute bottom-0 left-0 right-0 h-25 bg-linear-to-t from-[rgba(17,31,53,0.98)] to-transparent transition-opacity duration-300 ease"
                        style={{ opacity: bottomGradientOpacity }}
                    />
                </>
            )}
        </div>
    )
}

export default AnimatedList
