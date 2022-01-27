import styled from 'styled-components';
import '../fonts/Fonts.css';

const TopHeader = styled.header`
    width: 100%;
    position: fixed;
    top: 0;
    /* background-color: #f6f5f0; */
    background-color: red;
    border-bottom: 1px solid #c8c8c8;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MainBox = styled.div`
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HeaderTitle = styled.span`
    font-family: 'CookieRun Regular';
    font-size: 30px;
`;

function Header() {
    return (
        <TopHeader>
            <MainBox>
                <HeaderTitle>Lesa Trello</HeaderTitle>
            </MainBox>
        </TopHeader>
    );
}

export default Header;
