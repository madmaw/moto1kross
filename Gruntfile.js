module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            dist: {
                src: ['src/main/ts/**/*.ts', 'src/main/d.ts/**/*.d.ts'],
                out: 'build/out.js',
                options: {
                    module: 'amd', //or commonjs
                    target: 'es5', //or es3
                    basePath: 'src/main/ts',
                    sourceMap: true,
                    declaration: false, 
                    comments: true
                }
            }

        },
        clean: {
            all: ["build", "dist", "dist.zip", "js13k.zip"],
            dist: ["dist"]
        },
        'closure-compiler': {
            js1k: {
                closurePath: 'libbuild/closure-compiler',
                js: 'build/out.js',
                jsOutputFile: 'dist/out.min.js',
                maxBuffer: 500,
                reportFile: 'closure.txt',
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5',
                    // ES6 output is not supported!!
                    language_out: 'ECMASCRIPT5', 
                    externs: 'src/main/externs/js1k.js'
                }
            }

        },
        inline: {
            dist: {
                src: 'dist/index.html',
                dest: 'dist/index.html'
            }
        },
        replace: {
            js1k: {
                src: ['dist/out.min.js'],
                overwrite: true,
                replacements: [{
                    from: /(=|:|return |\(|,)function\(([^\)]*)\)/g, 
                    to:"$1($2)=>"
                }, {
                    from: /var [^;=]*;/g, 
                    to: ""
                }, {
                    from: /var /g, 
                    to: ""
                }, {
                    from: /(\n|\r)/g,
                    to: ""
                }/*, {
                    // note, this is a symptom that TS is initalizing your local vars (which you don't want)
                    from: /void 0/g,
                    to: "0"
                }*/]
            }, 
            shim: {
                src: ['dist/index.html'], 
                overwrite: true, 
                replacements: [{
                    from: /<!--demo--><script>/g, 
                    to:"<script type='demo'>"
                }]
            }
        },
        inline: {
            js1k: {
                src: 'shim.html',
                dest: 'dist/index.html'
            }
        },        
        devUpdate: {
            main: {
                options: {
                    //task options go here 
                    updateType: 'force',
                    reportUpdated: true
                }
            }
        }
    });

    // clean
    grunt.loadNpmTasks('grunt-contrib-clean');
    // load the plugin that provides the closure compiler
    grunt.loadNpmTasks('grunt-closure-compiler');
    // Load the plugin that provides the "TS" task.
    grunt.loadNpmTasks('grunt-ts');
    // copy
    grunt.loadNpmTasks('grunt-contrib-copy');
    // replace text in file
    grunt.loadNpmTasks('grunt-text-replace');
    // update version
    grunt.loadNpmTasks('grunt-dev-update');
    // inline js 
    grunt.loadNpmTasks('grunt-inline');

    // Default task(s).
    grunt.registerTask('reset', ['clean:all']);
    grunt.registerTask('prod', ['ts:dist']);
    grunt.registerTask('js1k', ['prod', 'closure-compiler:js1k', 'replace:js1k', 'inline:js1k', 'replace:shim']);
    grunt.registerTask('default', ['js1k']);

};