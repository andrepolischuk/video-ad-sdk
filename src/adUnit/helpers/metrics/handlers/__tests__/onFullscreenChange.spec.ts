import {linearEvents} from '../../../../../tracker';
import onFullscreenChange from '../onFullscreenChange';

const {
  fullscreen,
  exitFullscreen,
  playerCollapse,
  playerExpand
} = linearEvents;

test('onFullscreenChange must call playerExpand on when going fullscreen and playerCollapse when when leaving fullscreen', () => {
  const callback = jest.fn();
  const videoElement = document.createElement('VIDEO');
  const disconnect = onFullscreenChange({
    videoElement
  }, callback);

  document.fullscreenElement = videoElement;
  document.dispatchEvent(new Event('fullscreenchange'));
  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenCalledWith(playerExpand);
  expect(callback).toHaveBeenCalledWith(fullscreen);

  callback.mockClear();
  document.fullscreenElement = null;
  document.dispatchEvent(new Event('fullscreenchange'));
  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenCalledWith(playerCollapse);
  expect(callback).toHaveBeenCalledWith(exitFullscreen);

  disconnect();
  callback.mockClear();
  document.fullscreenElement = document.createElement('VIDEO');
  document.dispatchEvent(new Event('fullscreenchange'));
  expect(callback).not.toHaveBeenCalled();

  delete document.fullscreenElement;
});
