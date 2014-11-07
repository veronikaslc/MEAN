describe('twitter home page', function(){
    var prot = protractor.getInstance();
    var url = 'http://localhost:3000';
    prot.ignoreSynchronization = true;


    beforeEach(function(){
        prot.sleep(200);
    });

    it('login check', function(){
        prot.get(url);
        expect(prot.getTitle()).toBe('The MEAN Stack');

        element(by.id('newusername')).sendKeys('q');
        element(by.id('newuserpassword')).sendKeys('q');
        element(by.id('registerbutton')).click();

        element(by.model('user.name')).sendKeys('q');
        element(by.model('user.password')).sendKeys('q');
        element(by.id('loginbutton')).click().then(function(){
            expect(browser.getCurrentUrl()).toEqual(url+'/#/users');
            //expect(prot.getCurrentURL()).toEqual(url+'/users')
        });

        //browser.get(url+'/users');
        //expect(browser.getCurrentUrl()).toEqual(url+'/users');
    });

    it('users check', function(){
        prot.get(url+'/users');
        expect(prot.getCurrentUrl()).toEqual(url+'/users');

    });

});