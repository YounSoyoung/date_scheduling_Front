import React, {useState} from "react";
import { Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';

import PropTypes from 'prop-types';

const NewPost = ({ direction, ...args }) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return(
        <>
            <h1>리뷰 작성</h1>
            <div>
                <h2>카테고리</h2>
                <div>지역 선택</div>
                <div>구 선택</div>
                <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
                        <DropdownToggle caret>Dropdown</DropdownToggle>
                        <DropdownMenu {...args}>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem>Some Action</DropdownItem>
                        <DropdownItem text>Dropdown Item Text</DropdownItem>
                        <DropdownItem disabled>Action (disabled)</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Foo Action</DropdownItem>
                        <DropdownItem>Bar Action</DropdownItem>
                        <DropdownItem>Quo Action</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
            </div>
            <div>
                <h3>제목</h3>
                <input type="text" placeholder="리뷰할 장소 이름을 적어주세요"></input>
            </div>
            <div>
                <div>사진과 경험을 공유해주세요</div>
                <div>사진</div>
                <div>작성칸</div>
            </div>
        </>
    );
};

// NewPost.propTypes = {
//     direction: PropTypes.string,
//   };

export default NewPost;