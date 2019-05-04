import audio from "../features/audio";
import song from "../features/song";
import user from "../features/user";

export default [...audio.logic, ...song.logic, ...user.logic];
