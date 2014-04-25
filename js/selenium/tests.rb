require 'date'
require 'time'
require 'socket'
require 'watir-webdriver'
require 'minitest/autorun'
require 'minitest/spec'
include Selenium

describe "Example Selenium Tests" do

    before :each do
      @b = Watir::Browser.new :firefox
    end

    after :each do
      @b.close
    end

    describe "basic application acceptance tests" do
      it "ajax response with 2 people yields table with 2 rows" do
        @b.goto "http://127.0.0.1:3000/"
        table = @b.table(:id => 'people')
        assert_equal table.rows.length, 2
      end

      it "add will append another person to the html table" do
        @b.goto "http://127.0.0.1:3000/"
        table = @b.table(:id => 'people')
        assert_equal table.rows.length, 2
        assert_equal table[0][0].text, "matt morrison"
        assert_equal table[1][0].text, "toran billups"
        @b.text_field(:class,'firstName').set("dustin")
        @b.text_field(:class,'lastName').set("thostenson")
        @b.button(:class,"submit").click
        sleep 1
        table = @b.table(:id => 'people')
        assert_equal table.rows.length, 3
        assert_equal table[2][0].text, "dustin thostenson"
      end

      it "delete will remove the person for a given row" do
        @b.goto "http://127.0.0.1:3000/"
        table = @b.table(:id => 'people')
        assert_equal table.rows.length, 2
        assert_equal table[0][0].text, "matt morrison"
        assert_equal table[1][0].text, "toran billups"
        @b.table(:id => 'people')[1][1].button(:class,"delete").click
        sleep 1
        table = @b.table(:id => 'people')
        assert_equal table.rows.length, 1
        assert_equal table[0][0].text, "matt morrison"
      end

    end
end
