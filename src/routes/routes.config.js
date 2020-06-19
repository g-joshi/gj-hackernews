import App from '../App';

const routes = [
    {
        path: "/",
        exact: true,
        component: App
    },
    {
        path: "/:pageId",
        component: App,
    }
];

export default routes;
