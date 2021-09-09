import { create } from 'dva-core';

import createLoading from 'dva-loading';

import models from '../models';

export default function configStore() {
    const app = create({
        onError(e) {
            console.error('出错了:' + e.message);
        }
    });

    models.forEach((model) => {
        app.model(model);
    });

    app.use(createLoading());

    app.start();

    return app._store;
}
