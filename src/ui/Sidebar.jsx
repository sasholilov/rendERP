import styled from "styled-components";
import Logo from "./Logo";
import { NavLink, Link } from "react-router-dom";
import { TbFileInvoice } from "react-icons/tb";
import { BiMoney } from "react-icons/bi";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { BiBus } from "react-icons/bi";
import { HiBuildingStorefront } from "react-icons/hi2";
import { GoPeople } from "react-icons/go";
import { FiSettings } from "react-icons/fi";

const StyledSidebar = styled.div`
  background-color: var(--color-blue-2);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-3);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const MenuItemList = styled.ul`
  display: flex;
  text-align: left;
  flex-direction: column;
  gap: 2rem;
  padding: 0;
  margin: 0;

  & .active > li {
    color: var(--color-blue-1);
  }
`;

const MenuItem = styled.li`
  color: var(--color-grey-0);
  font-size: 12px;
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1.5rem;
  align-items: center;
  font-size: 1.4rem;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: var(--color-blue-1);
  }
`;

const ItemName = styled.span`
  font-size: 14px;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Link to="/dashboard">
        <Logo />
      </Link>
      <MenuItemList>
        <NavLink to="/invoicing">
          <MenuItem>
            <TbFileInvoice />
            <ItemName>Invoicing</ItemName>
          </MenuItem>
        </NavLink>
        <NavLink to="/sale">
          <MenuItem>
            <BiMoney />
            <ItemName>Sale</ItemName>
          </MenuItem>
        </NavLink>
        <NavLink to="/purchase">
          <MenuItem>
            <BiPurchaseTagAlt />
            <ItemName>Purchase</ItemName>
          </MenuItem>
        </NavLink>
        <NavLink to="/suppliers">
          <MenuItem>
            <BiBus />
            <ItemName>Suppliers</ItemName>
          </MenuItem>
        </NavLink>
        <NavLink to="/outlets">
          <MenuItem>
            <HiBuildingStorefront />
            <ItemName>Outlets</ItemName>
          </MenuItem>
        </NavLink>
        <NavLink to="/hr">
          <MenuItem>
            <GoPeople />
            <ItemName>HR</ItemName>
          </MenuItem>
        </NavLink>
        <NavLink to="/settings">
          <MenuItem>
            <FiSettings />
            <ItemName>Settings</ItemName>
          </MenuItem>
        </NavLink>
      </MenuItemList>
    </StyledSidebar>
  );
}

export default Sidebar;
