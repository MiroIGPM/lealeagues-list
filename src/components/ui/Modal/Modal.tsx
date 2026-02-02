import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ModalProps, ModalHeaderProps, ModalBodyProps, ModalFooterProps } from './types';

const ModalHeader = ({ children }: ModalHeaderProps) => {
  return <div className="px-6 py-4 border-b border-gray-200">{children}</div>;
};

const ModalBody = ({ children }: ModalBodyProps) => {
  return <div className="px-6 py-4">{children}</div>;
};

const ModalFooter = ({ children }: ModalFooterProps) => {
  return (
    <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
      {children}
    </div>
  );
};

const ModalComponent = ({ isOpen, onClose, children }: ModalProps) => {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
        data-testid="modal-backdrop"
      />
      <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-auto">
        {children}
      </div>
    </div>,
    document.body
  );
};

export const Modal = Object.assign(ModalComponent, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
