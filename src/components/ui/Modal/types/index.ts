import type { ReactNode } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export interface ModalHeaderProps {
  children: ReactNode;
}

export interface ModalBodyProps {
  children: ReactNode;
}

export interface ModalFooterProps {
  children: ReactNode;
}
