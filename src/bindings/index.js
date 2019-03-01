import handler0 from './main/A/index.js';
import handler1 from './main/B/index.js';
import handler2 from './main/index.js';
import handler3 from './main/Intermediate/index.js';
export default opts => ({
    'main:A': handler0(opts),
    'main:B': handler1(opts),
    'main': handler2(opts),
    'main:Intermediate': handler3(opts)
});