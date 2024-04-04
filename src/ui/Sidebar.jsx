import styled from "styled-components";
import Logo from "./Logo";
import { TbFileInvoice } from "react-icons/tb";
import { BiMoney } from "react-icons/bi";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { BiBus } from "react-icons/bi";
import { HiBuildingStorefront } from "react-icons/hi2";
import { GoPeople } from "react-icons/go";
import { FiSettings } from "react-icons/fi";

const StyledSidebar = styled.div`
  background-color: #1a233a;
  font-family: "IBM Plex Sans", sans-serif;
  padding: 3.2rem 2.4rem;
  border-right: 1px solid #686868;
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
`;

const MenuItem = styled.li`
  color: #c5cede;
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
    color: #6384ea;
  }
`;

const ItemName = styled.span`
  font-size: 14px;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MenuItemList>
        <MenuItem>
          <TbFileInvoice />
          <ItemName>Invoicing</ItemName>
        </MenuItem>
        <MenuItem>
          <BiMoney />
          <ItemName>Sales</ItemName>
        </MenuItem>
        <MenuItem>
          <BiPurchaseTagAlt />
          <ItemName>Purchase</ItemName>
        </MenuItem>
        <MenuItem>
          <BiBus />
          <ItemName>Suppliers</ItemName>
        </MenuItem>
        <MenuItem>
          <HiBuildingStorefront />
          <ItemName>Outlets</ItemName>
        </MenuItem>
        <MenuItem>
          <GoPeople />
          <ItemName>HR</ItemName>
        </MenuItem>
        <MenuItem>
          <FiSettings />
          <ItemName>Settings</ItemName>
        </MenuItem>
      </MenuItemList>
    </StyledSidebar>
  );
}

export default Sidebar;
