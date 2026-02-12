declare module '*.scss';
declare module '*.sass';
declare module '*.css';

declare module '*.hbs?raw' {
    const template: string;
    export default template;
}
