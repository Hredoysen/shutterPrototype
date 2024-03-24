import './Auth.scss'
import {Button, Checkbox, Form, FormProps, Input, message, Skeleton} from "antd";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {doc, getFirestore, setDoc} from "firebase/firestore";
import {auth} from "../../Firebase.tsx";
import {useState} from "react";
import {Logger} from "sass";

type AuthProps = {
    type: 'sign-in' | 'sign-up' | 'forgot';
};

export const Auth: React.FC<AuthProps> = ({type}) => {
    const [isFetching, setFetching] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };



    if (isFetching) {
        return (
            <div>
                <Skeleton
                    className="bg-white dark:bg-[#0A0A0A] p-10"
                    active
                    paragraph={{rows: 30}}
                />
            </div>
        )
    }

    const onFinish: FormProps<FieldType>["onFinish"] = (values: any) => {
        if (type === 'sign-in') {
            signInWithEmailAndPassword(auth, values.username, values.password).then((cred) => {

            }).catch((err) => {
                console.log(err)
            })
        }
        if (type === 'sign-up') {
            createUserWithEmailAndPassword(auth, values.username, values.password)
                .then((cred) => {

                    const db = getFirestore();
                    const userRef = doc(db, 'user', cred.user.uid);
                    setDoc(userRef, { // Correct the document data structure
                        userType: 'admin',
                        profileReady: false,
                        accessToken: cred.user.accessToken
                    })
                        .then(() => {
                            console.log('User created with additional data:', cred.user);
                        })
                        .catch((error) => {
                            console.error('Error adding additional data:', error);
                        });
                })
                .catch((err) => {
                    console.error('Error creating user:', err);
                });

        }
    };
    let title;
    switch (type) {
        case 'sign-in':
            title = 'Sign in to your account';
            break;
        case 'sign-up':
            title = 'Create a new account';
            break;
        case 'forgot':
            title = 'Forgot your password?';
            break;
        default:
            title = '';
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900"
        >
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                         alt="logo"></img>
                    Prototype
                </a>
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {title}
                        </h1>
                        <Form
                            name="basic"
                            labelCol={{span: 8}}
                            wrapperCol={{span: 24}}
                            layout={"vertical"}
                            style={{maxWidth: 600}}
                            initialValues={{remember: true}}
                            onFinish={onFinish}
                            // onFinishFailed={onFinishFailed}
                            autoComplete="on"
                            className="space-y-4 md:space-y-6"
                        >
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Username/Email
                                </label>
                                <Form.Item<FieldType>
                                    name="username"
                                    rules={[{required: true, message: 'Please input your username!'}]}
                                >
                                    <Input size="large"/>
                                </Form.Item>
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {required: true, message: 'Please input your password!'},
                                        {min: 8, message: 'Password must be at least 8 characters long!'},
                                        {
                                            pattern: /[a-z]/,
                                            message: 'Password must contain at least one lowercase letter!'
                                        },
                                        {
                                            pattern: /[A-Z]/,
                                            message: 'Password must contain at least one uppercase letter!'
                                        },
                                        {pattern: /\d/, message: 'Password must contain at least one number!'},
                                        {
                                            pattern: /[$#!@%^&*()]/,
                                            message: 'Password must contain at least one special character'
                                        },
                                    ]}
                                >
                                    <Input.Password size="large"/>
                                </Form.Item>
                            </div>
                            {type === 'sign-up' && <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                                    Password</label>
                                <Form.Item
                                    name="confirm_password"
                                    id='confirm_password'
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {required: true, message: 'Please confirm your password!'},
                                        ({getFieldValue}) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error("Password didn't match"));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password size="large"/>
                                </Form.Item>
                            </div>}
                            {type === 'sign-in' &&
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Form.Item<FieldType>
                                            name="remember"
                                            valuePropName="checked"
                                            className='mt-6'
                                        >
                                            <Checkbox></Checkbox>
                                        </Form.Item>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember
                                                me</label>
                                        </div>
                                    </div>
                                    <a href="/forgot"
                                       className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot
                                        password?</a>
                                </div>
                            }
                            <div className='text-center'>
                                <Button ghost htmlType="submit" type="primary" shape="round" size='large'>
                                    {type === 'sign-in' && 'Sign In'}
                                    {type === 'sign-up' && 'Sign Up'}
                                    {type === 'forgot' && 'Send'}
                                </Button>
                            </div>
                            {type === 'sign-in' &&
                                <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <a href="/sign-up"
                                                                  className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign
                                    up</a>
                                </p>}

                            {type === 'sign-up' &&
                                <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href="/sign-in"
                                                                className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign
                                    In</a>
                                </p>}

                        </Form>
                    </div>
                </div>
            </div>
        </section>
    )
}

