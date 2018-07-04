'use strict';

export default function(User) {
    User.login = async function(){
        
    }

    User.remoteMethod(
        'status', {
            http: {
            path: '/login',
            verb: 'post'
            },
            returns: {
            arg: 'status',
            type: 'string'
            }
        }
    );
};
