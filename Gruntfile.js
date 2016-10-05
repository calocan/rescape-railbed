module.exports = function(grunt) {
    grunt.initConfig({
        responsive_images: {
            options: {
                // ImageMagick is available on Heroku, not GraphicsMagick
                engine: 'im'
            },
            dev: {
                options: {
                    sizes: [{
                        width: 320
                    }, /*{
                        width: 500
                    }, {
                        width: 800
                    }*/, {
                        width: 1024
                    }, /*{
                       name: '',
                       width: '100%'
                    }*/
                    ]
                },
                files: [{
                    expand: true,
                    cwd: 'app/images',
                    src: ['**/*.{jpg,gif,png}'],
                    dest: 'app/images_dist'
                }]
            }
        },
    })
    grunt.loadNpmTasks('grunt-responsive-images')
    grunt.registerTask('default', ['responsive_images'])
}