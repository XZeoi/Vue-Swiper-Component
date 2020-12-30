import Mock from 'mockjs'
let { banners } = Mock.mock({
    "banners":[
        {
          "id": 1,
          "images":"@image('200x100', '#000', '#FFF', '1')",
        },
        {
          "id": 2,
          "images":"@image('200x100', '#433332', '#FFF', '2')",
        },
        {
          "id": 3,
          "images":"@image('200x100', 'pink', '#FFF', '3')",
        },
        {
          "id": 4,
          "images":"@image('200x100', 'green', '#FFF', '4')",
        },
        {
          "id": 5,
          "images":"@image('200x100', '#40405d', '#FFF', '5')",
        },
        {
          "id": 6,
          "images":"@image('200x100', '#50405d', '#FFF', '6')",
        }
      ]
      
})


// Mock.mock('/blog/articleslist1','get',()=>{
Mock.mock(/\/home\/datalist/,'get',()=>{
    return {
        status: 200,
        message: '获取banners成功',
        list: banners
    }
})



