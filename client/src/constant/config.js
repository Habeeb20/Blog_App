//API Notification Messages

export const API_Notification_message = {
    loading: {
        title: "Loading...",
        message: "data is being loaded, please wait"
    },

    success: {
        title:"success",
        message: "Data successfully loaded"
    },

    requestFailure: {
        title: "Error",
        message: "an error occured while parsing your request"
    },

    responseFailure: {
        title:"Error",
        message: "An error occur while fetching your data"
    },

    networkError: {
        title: "Error",
        message: "unable to connect to the server"
    }
}


// API SERVICE URL
// SAMPLE REQUEST
// NEED SERVICE CALL: { url: "/", method: "POST/GET/PUT/DELETE" }

export const serviceUrls = {
    userLogin: {url: '/login', method: 'POST'},
    userSignup:{url:'/signup', method: 'POST'},
    getAllPosts:{url:'/posts', method: 'GET', params: true},
    getRefreshToken: {url: '/token', method: 'POST'},
    uploadFile: { url: 'file/upload', method: 'POST' },
    createPost: { url: 'create', method: 'POST' },
    deletePost: { url: 'delete', method: 'DELETE', query: true },
    getPostById: { url: 'post', method: 'GET', query: true },
    newComment: { url: '/comment/new', method: 'POST' },
    getAllComments: { url: 'comments', method: 'GET', query: true },
    deleteComment: { url: 'comment/delete', method: 'DELETE', query: true },
    updatePost: { url: 'update', method: 'PUT', query: true }
}