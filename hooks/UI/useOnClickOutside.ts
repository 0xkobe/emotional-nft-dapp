import { useEffect } from 'react'

export default function useOnClickOutside(ref: any, handler: any) {
  useEffect(() => {
    function listener(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler && handler()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', listener)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', listener)
    }
  }, [ref, handler])
}