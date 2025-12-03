"use client";

import { useState, useCallback, useEffect, useRef } from "react";

interface UseModalOptions {
    onOpen?: () => void;
    onClose?: () => void;
    closeOnEscape?: boolean;
    closeOnOutsideClick?: boolean;
    preventBodyScroll?: boolean;
}

export function useModal(options: UseModalOptions = {}) {
    const {
        onOpen,
        onClose,
        closeOnEscape = true,
        closeOnOutsideClick = true,
        preventBodyScroll = true,
    } = options;

    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const open = useCallback(() => {
        setIsOpen(true);
        onOpen?.();
    }, [onOpen]);

    const close = useCallback(() => {
        setIsOpen(false);
        onClose?.();
    }, [onClose]);

    const toggle = useCallback(() => {
        if (isOpen) {
            close();
        } else {
            open();
        }
    }, [isOpen, open, close]);

    // Handle outside click
    useEffect(() => {
        if (!isOpen || !closeOnOutsideClick) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                close();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, closeOnOutsideClick, close]);

    // Handle escape key
    useEffect(() => {
        if (!isOpen || !closeOnEscape) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                close();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, closeOnEscape, close]);

    // Handle body scroll
    useEffect(() => {
        if (!preventBodyScroll) return;

        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen, preventBodyScroll]);

    return {
        isOpen,
        open,
        close,
        toggle,
        modalRef,
    };
}
