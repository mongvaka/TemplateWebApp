"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAppInjector = exports.AppInjector = void 0;
/**
 * Helper to set the exported {@link AppInjector}, needed as ES6 modules export
 * immutable bindings (see http://2ality.com/2015/07/es6-module-exports.html) for
 * which trying to make changes after using `import {AppInjector}` would throw:
 * "TS2539: Cannot assign to 'AppInjector' because it is not a variable".
 */
function setAppInjector(injector) {
    if (exports.AppInjector) {
        // Should not happen
        console.error('Programming error: AppInjector was already set');
    }
    else {
        exports.AppInjector = injector;
    }
}
exports.setAppInjector = setAppInjector;
