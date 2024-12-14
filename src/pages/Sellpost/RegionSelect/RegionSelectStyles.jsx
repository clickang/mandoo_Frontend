import styled from "styled-components";

export const RegionContainer = styled.div`
  display: flex;
  min-width: 400px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
`;

export const RegionColumn = styled.div`
  flex: 1;
  max-height: 300px; /* Adjust height to your requirement */
  overflow-y: auto;
  border-right: 1px solid #ddd;
  &:last-child {
    border-right: none;
  }
`;

export const RegionItem = styled.div`
  padding: 10px 15px; /* Adjust padding to make items wider */
  font-size: 14px; /* Adjust font size */
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "#007bff" : "#fff")};
  color: ${(props) => (props.isSelected ? "#fff" : "#333")};
  border-bottom: 1px solid #eee;

  &:hover {
    background-color: ${(props) =>
      props.isSelected ? "#0056b3" : "#f8f9fa"}; /* Lighter hover effect */
  }

  &:last-child {
    border-bottom: none;
  }
`;
