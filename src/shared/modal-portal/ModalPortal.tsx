import React from 'react'
import ReactDOM from 'react-dom'
import { useScrollLock } from '@hooks/useScrollLock'

interface ModalPortalProps {
  isOpen: boolean
  children: React.ReactNode
}

export const ModalPortal: React.FC<ModalPortalProps> = ({
  isOpen,
  children
}) => {
  useScrollLock(isOpen)

  const [modalRoot, setModalRoot] = React.useState<HTMLElement | null>(null)

  React.useEffect(() => {
    let element = document.getElementById('modal-root')
    if (!element) {
      element = document.createElement('div')
      element.id = 'modal-root'
      document.body.appendChild(element)
    }
    setModalRoot(element)

    return () => {
      if (element?.parentNode && element.childNodes.length === 0) {
        element.parentNode.removeChild(element)
      }
    }
  }, [])

  if (!isOpen || !modalRoot) return null

  return ReactDOM.createPortal(children, modalRoot)
}
