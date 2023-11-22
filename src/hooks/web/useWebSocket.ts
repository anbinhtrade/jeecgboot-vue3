// noinspection JSUnusedGlobalSymbols

import { unref } from 'vue';
import { useWebSocket, WebSocketResult } from '@vueuse/core';
import { getToken } from '/@/utils/auth';

let result: WebSocketResult<any>;
const listeners = new Map();

/**
 * Enable the WebSocket link, which only needs to be executed once globally
 * @param url
 */
export function connectWebSocket(url: string) {
  //update-begin-author:taoyan date:2022-4-24 for: The websocket server of v2.4.6 has performance and security issues. #3278
  let token = (getToken() || '') as string;
  result = useWebSocket(url, {
    // Automatically reconnect (reconnect up to 10 times when an error occurs)
    autoReconnect: {
      retries : 10,
      delay : 5000
    },
    // Heartbeat detection
    heartbeat: {
      message: "ping",
      interval: 55000
    },
    protocols: [token],
  });
  //update-end-author:taoyan date:2022-4-24 for: v2.4.6 的 websocket 服务端，存在性能和安全问题。 #3278
  if (result) {
    result.open = onOpen;
    result.close = onClose;

    const ws = unref(result.ws);
    if(ws!=null){
      ws.onerror = onError;
      ws.onmessage = onMessage;
    }
  }
}

function onOpen() {
  console.log('[WebSocket] Connection successful');
}

function onClose(e) {
  console.log('[WebSocket] Connection lost: ', e);
}

function onError(e) {
  console.log('[WebSocket] Connection error: ', e);
}

function onMessage(e) {
  console.debug('[WebSocket] -----Receive message-------', e.data);
  try {
    const data = JSON.parse(e.data);
    for (const callback of listeners.keys()) {
      try {
        callback(data);
      } catch (err) {
        console.error(err);
      }
    }
  } catch (err) {
    console.error('[WebSocket] data parsing failed: ', err);
  }
}


/**
 * Add WebSocket message listening
 * @param callback
 */
export function onWebSocket(callback: (data: object) => any) {
  if (!listeners.has(callback)) {
    if (typeof callback === 'function') {
      listeners.set(callback, null);
    } else {
      console.debug('[WebSocket] Failed to add WebSocket message listening: The parameter passed in is not a method');
    }
  }
}

/**
 * Disable WebSocket message listening
 *
 * @param callback
 */
export function offWebSocket(callback: (data: object) => any) {
  listeners.delete(callback);
}

export function useMyWebSocket() {
  return result;
}
