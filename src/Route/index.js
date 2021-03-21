
import DetailMovie from '../Components/Movie';
import HomePage from '../Container/HomeTemplate/HomePage';
import ListMoviePage from '../Container/HomeTemplate/ListMoviePage';


const routeHome = [
    {
        path: '/',
        component: HomePage,
        exact: true,
    },
  
    
    {
        path: '/detail/:id',
        component: DetailMovie,
        exact: false,
    },
    {
        path: '/list-movie',
        component: ListMoviePage,
        exact: false,
    },
    // {
    //     path: '/hook',
    //     component: Hook,
    //     exact: false,
    // },
    

]


// const routeAdmin = [
//     // {
//     //     path: '/dashboard',
//     //     component: DashBoard,
//     //     exact: false,
//     // },
//     // {
//     //     path: '/add-user',
//     //     component: AddUser,
//     //     exact: false,
//     // },
  

// ]

export {routeHome};