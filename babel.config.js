module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        targets: {
          browsers: '>1%',
          node: 'current'
        }
      }
    ],
    [
      '@babel/preset-react',
      { pragma: 'createNode' }
    ]
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
};
