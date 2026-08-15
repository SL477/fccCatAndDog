import { io, loadLayersModel } from '@tensorflow/tfjs-node';

export async function modelLoader() {
    return await loadLayersModel(io.fileSystem('./jsmodel/model.json'));
}
