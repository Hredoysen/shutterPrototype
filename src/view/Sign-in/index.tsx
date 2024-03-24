import {Button, Layout, Menu, MenuProps, Skeleton} from "antd";
import {signOut} from "firebase/auth";
import {auth} from "../../Firebase.tsx";
import {useDispatch, useSelector} from "react-redux";
import {BsChevronLeft, BsChevronRight} from 'react-icons/bs';
import React, {Suspense, useState} from "react";
import Sider from "antd/es/layout/Sider";
import {Content, Footer, Header} from "antd/es/layout/layout";
import TopBar from "../../components/top-bar/TopBar.tsx";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Option 1', '1', ''),
    getItem('Option 2', '2', ''),
    getItem('Option 3', '3', ''),

    getItem('Navigation One', 'sub1', '', [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Option 7', '7'),
        getItem('Option 8', '8'),
    ]),

    getItem('Navigation Two', 'sub2', '', [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),

        getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    ]),
];

function AuthLanding() {

    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const headerStyle: React.CSSProperties = {
        textAlign: 'center',
        height: 64,
        position:'fixed',
        width: '100%',
        paddingInline: 48,
        lineHeight: '64px',
        backgroundColor: '#fff',
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
    };

    const contentStyle: React.CSSProperties = {
        textAlign: 'center',
        minHeight: 120,
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: '#fff',
    };

    const siderStyle: React.CSSProperties = {
        position: 'relative', // Add position relative to Sider
        textAlign: 'center',
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: '#fff',
        boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)', // Add a right shadow
    };

    const logoStyle: React.CSSProperties = {
        padding: 15,
    };

    const buttonStyle: React.CSSProperties = {
        position: 'absolute', // Position the button absolutely within the Sider
        top: 15, // Align to the top
        right: -18, // Align to the right
        // backgroundColor: '#fff',
        boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.2)', // Add a right shadow
        zIndex: 1, // Ensure button appears above other content
    };

    const footerStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#4096ff',
    };

    const layoutStyle = {
        borderRadius: 0,
        overflow: 'hidden',
        height: 'calc(100vh)',
        width: 'calc(100%)',
    };

    const user = useSelector(state => state);

    if (!user) {
        return (
            <Suspense
                fallback={
                    <div>
                        <Skeleton
                            className="bg-white dark:bg-[#0A0A0A] p-10"
                            active
                            paragraph={{rows: 30}}
                        />
                    </div>
                }
            >
            </Suspense>
        )
    }

    return (
        <>


            <Layout style={layoutStyle}>
                <Sider width="15%" style={siderStyle} collapsed={collapsed}>
                    <div className={'h-[66px] border-b-2 border-gray-200'} style={logoStyle}>
                        <div className={'flex align-middle justify-items-center'}>
                            <img className="w-10 h-10 mr-2"
                                 src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                                 alt="logo"></img>
                            {collapsed ? '' : <span className={'text-4xl font-semibold text-gray-900'}>LOGO</span>
                            }
                        </div>
                    </div>
                    {/*<Button type="default"  style={buttonStyle}>*/}

                    {/*</Button>*/}
                    {/*<button type="button" onClick={toggleCollapsed} */}
                    {/*        className="text-gray-900 hover:text-blue-600 rounded-full border border-gray-500 bg-white focus:ring-0 focus:outline-none font-bold text-xs px-4 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">*/}
                    {/*    {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}*/}
                    {/*</button>*/}
                    <Button
                        shape="circle"
                        onClick={toggleCollapsed}
                        icon={collapsed ? <BsChevronRight/> : <BsChevronLeft/>}
                        style={buttonStyle}
                        className="bg-white dark:bg-[#383838] h-8 text-sm flex items-center justify-center rounded-full"
                    />
                    <Menu
                        // defaultSelectedKeys={['1']}
                        // defaultOpenKeys={['sub1']}
                        mode="inline"
                        items={items}
                    >

                    </Menu>
                </Sider>
                <Layout>
                    <Header className={'border-l-2 border-gray-200'} style={headerStyle}> {user?.userData?.userType === 'admin' && 'Hello Admin'}
                        <TopBar></TopBar>
                    </Header>
                    <Content style={contentStyle}>Content</Content>
                    <Footer style={footerStyle}>Footer</Footer>
                </Layout>
            </Layout>
        </>
    );
}

export default AuthLanding;
