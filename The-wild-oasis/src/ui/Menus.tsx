import type React from "react";
import { createContext, useContext, useState, type ReactElement } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useClickOutside } from "../hooks/useClickOutside";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

type StyledListProps = {
  position: {
    x: number;
    y: number;
  };
};

const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

type MenusProps = {
  children: React.ReactNode;
};

type Position = {
  x: number;
  y: number;
} | null;

type MenusContextProps = {
  openId: string;
  close: () => void;
  open: React.Dispatch<React.SetStateAction<string>>;
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
};

const MenusContext = createContext<MenusContextProps | undefined>(undefined);

function Menus({ children }: MenusProps) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

type ToggleProps = {
  id: string;
};

function Toggle({ id }: ToggleProps) {
  const context = useContext(MenusContext);
  if (!context)
    throw new Error("useContext must be used within contextProvider");
  const { close, open, openId, setPosition } = context;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = (e.target as HTMLElement)
      .closest("button")
      ?.getBoundingClientRect();

    if (rect)
      setPosition({
        x: window.innerWidth - rect.width - rect.x,
        y: rect.y + rect.height + 8,
      });

    if (openId === "" || openId !== id) {
      open(id);
    } else {
      close();
    }
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

type ListProps = {
  id: string;
  children: React.ReactNode;
};

function List({ id, children }: ListProps) {
  const context = useContext(MenusContext);
  if (!context)
    throw new Error("useContext must be used within contextProvider");
  const { openId, position, close } = context;

  const ref = useClickOutside<HTMLUListElement>(close);

  if (openId !== id || !position) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

type ButtonProps = {
  children: React.ReactNode;
  icon: ReactElement;
  onClick?: () => void;
};

function Button({ children, icon, onClick }: ButtonProps) {
  const context = useContext(MenusContext);
  if (!context)
    throw new Error("useContext must be used within contextProvider");
  const { close } = context;

  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;

Menus.Toggle = Toggle;

Menus.List = List;

Menus.Button = Button;

export default Menus;
