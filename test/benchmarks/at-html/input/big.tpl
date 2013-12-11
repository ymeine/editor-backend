{Template {
  $classpath : "samples.features.prefill.basic.PrefillSample",
  $hasScript : true,
  $css : ["samples.features.prefill.basic.PrefillSampleCSS"],
  $dependencies : ['aria.utils.validators.AlphaInternational']
}}

  {macro main ()}
    <div><b>Unless otherwise specified, widgets on the right have a prefill bound to the same portion of the data model to which the value of the widget on the left is bound</b></div>

    <div class="sampleDiv" >
      <div class="title">
        Example of a TextField with an AlphaInternational validator: type "%^&" on the left
      </div>
      <table><tbody>
      <tr>
        <td>
        {@aria:TextField {
          id : "textf1",
          label : "TextField ",
          labelWidth:75,
          width:200,
          bind : {
            value : {
              to : "value1",
              inside : data
            }
          }
        } /}
        </td>
        <td>
        {@aria:TextField {
          id : "textf2",
          helptext : "Hi",
          width:200,
          bind : {
            value : {
              to : "value2",
              inside : data
            },
            prefill : {
              to : "value1",
              inside : data
            }
          }
        } /}
        </td>
      </tr>
    </tbody></table>
    </div>
    <div class="sampleDiv" >
        <div class="title">Example of a NumberField with native widget validation: type "aaa" on the left</div>
      <table><tbody>  <tr>
        <td>
        {@aria:NumberField {
          id : "nf1",
          label : "NumberField ",
          labelWidth:75,
          width:200,
          bind : {
            value : {
              to : "value9",
              inside : data
            }
          }
        } /}
        </td>
        <td>
        {@aria:NumberField {
          id : "nf2",
          width:200,
          bind : {
            value : {
              to : "value10",
              inside : data
            },
            prefill : {
              to : "value9",
              inside : data
            }
          }
        } /}
        </td>
      </tr>
    </tbody></table>
    </div>
    <div class="sampleDiv">
      <div class="title">
        The prefill is not validated: type "aaa" on the left, the widget on the right is prefilled. Then focus on the widget on the right
      </div>
    <table><tbody>
      <tr>
        <td>
        {@aria:TextField {
          id : "textf3",
          label : "TextField ",
          labelWidth:75,
          width:200,
          bind : {
            value : {
              to : "value17",
              inside : data
            }
          }
        } /}
        </td>
        <td>
        {@aria:NumberField {
          id : "nf3",
          label : "NumberField ",
          labelWidth :75,
          width:200,
          bind : {
            value : {
              to : "value18",
              inside : data
            },
            prefill : {
              to : "value17",
              inside : data
            }
          }
        } /}
        </td>
      </tr>
    </tbody></table>
    </div>
    <div class="sampleDiv">
    <div class="title">type 9.51pm on the left. Click on the right, then delete the field on the right: the prefill value is restored.</div>
    <table><tbody>
      <tr>
        <td>
        {@aria:TimeField {
          id : "timef1",
          label : "TimeField ",
          pattern : "HH:mm",
          labelWidth:75,
          width:200,
          bind : {
            value : {
              to : "value13",
              inside : data
            }
          }
        } /}
        </td>
        <td>
        {@aria:TimeField {
          id : "timef2",
          width:200,
          pattern : "HH:mm:ss",
          bind : {
            value : {
              to : "value14",
              inside : data
            },
            prefill : {
              to : "value13",
              inside : data
            }
          }
        } /}
        </td>
      </tr>
    </tbody></table>
    </div>
    <div class="sampleDiv">
    <div class="title">type 9.51pm on the left. Click on the right, then delete the field on the right: the prefill value is <b>NOT</b> restored. The prefill of the TimeField on the right is not directly bound to the value of the first one. Look at the script in order to see the logic that implements the binding.</div>
    <table><tbody>
      <tr>
        <td>
        {@aria:TimeField {
          id : "timef3",
          label : "TimeField ",
          pattern : "HH:mm",
          labelWidth:75,
          width:200,
          bind : {
            value : {
              to : "value19",
              inside : data
            }
          }
        } /}
        </td>
        <td>
        {@aria:TimeField {
          id : "timef4",
          width:200,
          pattern : "HH:mm:ss",
          bind : {
            value : {
              to : "value21",
              inside : data
            },
            prefill : {
              to : "value20",
              inside : data
            }
          }
        } /}
        </td>
      </tr>
    </tbody></table>
    </div>
    <div class="sampleDiv">
    <div class="title">Example of prefill value already set in the data model when the template is displayed. Also, an alternative to the Text widget is implemented as in the use case</div>
    <table><tbody>

      <tr>
        <td>
        {@aria:DatePicker {
          id : "dp1",
          label : "DatePicker ",
          labelWidth:75,
          width:200,
          bind : {
            value : {
              to : "value3",
              inside : data
            }
          }
        } /}
        </td>
        <td>
        {@aria:DatePicker {
          id : "dp2",
          pattern : "EEEE d MMMM yyyy",
          width:200,
          bind : {
            value : {
              to : "value4",
              inside : data
            },
            prefill : {
              to : "value3",
              inside : data
            }
          }
        } /}
        </td>
        <td>
        {section {
          id : "weekDayText",
          bindRefreshTo : [{
            to : "value4",
            inside : data
          },{
            to : "value3",
            inside : data
          }],
          macro : "textMacro"
        } /}
        </td>
      </tr>
    </tbody></table>
    </div>
    <div class="sampleDiv">
    <table><tbody>
      <tr>
        <td>
        {@aria:DateField {
          id : "df1",
          label : "DateField ",
          labelWidth:75,
          width:200,
          bind : {
            value : {
              to : "value7",
              inside : data
            }
          }
        } /}
        </td>
        <td>
        {@aria:DateField {
          id : "df2",
          pattern : "EEEE d MMMM yyyy",
          width:200,
          bind : {
            value : {
              to : "value8",
              inside : data
            },
            prefill : {
              to : "value7",
              inside : data
            }
          }
        } /}
        </td>
      </tr>
    </tbody></table>
    </div>
    <div class="sampleDiv">
    <table><tbody>
      <tr>
        <td>
        {@aria:MultiSelect {
          id : "ms1",
          helptext : "Multiselect",
          activateSort: true,
          label: "MultiSelect ",
          labelWidth:75,
          width:200,
          fieldDisplay: "code",
          fieldSeparator:',',
          valueOrderedByClick: true,
          maxOptions:7,
          numberOfRows:4,
          displayOptions : {
            flowOrientation:'horizontal',
            listDisplay: "both",
            displayFooter : true
          },
          items: this.data.items,
          bind:{
            value : {
              to : 'value5',
              inside : data
            }
          }
        }/}
        </td>
        <td>
        {@aria:MultiSelect {
          id : "ms2",
          helptext : "Multiselect",
          activateSort: true,
          width:200,
          fieldDisplay: "code",
          fieldSeparator:',',
          valueOrderedByClick: true,
          maxOptions:7,
          numberOfRows:4,
          displayOptions : {
            flowOrientation:'horizontal',
            listDisplay: "both",
            displayFooter : true
          },
          items: this.data.items1,
          bind:{
            value : {
              to : 'value6',
              inside : data
            },
            prefill : {
              to : "value5",
              inside : data
            }
          }
        }/}
        </td>
      </tr>
    </tbody></table>
    </div>
    <div class="sampleDiv">
    <div class="title">Example with helptext: select an option on the left, then delete the text inside the left widget: the helptext is restored in both fields</div>
    <table><tbody>
      <tr>
        <td>
        {@aria:SelectBox {
          id : "sb1",
          label : "SelectBox ",
          labelWidth:75,
          width:200,
          helptext:"Type text or select",
          options: data.items,
          bind : {
            value : {
              to : "value11",
              inside : data
            }
          }
        } /}
        </td>
        <td>
        {@aria:SelectBox {
          id : "sb2",
          width:200,
          helptext:"Type text or select",
          options: data.items1,
          bind : {
            value : {
              to : "value12",
              inside : data
            },
            prefill : {
              to : "value11",
              inside : data
            }
          }
        } /}
        </td>
      </tr>
    </tbody></table>
    </div>
    <div class="sampleDiv">
    <table><tbody>
      <tr>
        <td>
        {@aria:AutoComplete {
          id : "ac1",
          label:"AutoComplete ",
          helptext:"country",
          labelWidth:75,
          width:200,
          block:false,
          resourcesHandler: getNationsHandler(3),
          preselect: "always",
          bind:{
              "value" : {
                inside : data,
                to : "value15"
              }
          }
        }/}
        </td>
        <td>
        {@aria:AutoComplete {
          id : "ac2",
          helptext:"country",
          labelWidth:75,
          width:200,
          block:false,
          resourcesHandler: getNationsHandler(3),
          preselect: "always",
          bind:{
              "prefill" : {
                inside : data,
                to : "value15"
              },
              "value" : {
                inside : data,
                to : "value16"
              }
          }
        }/}
        </td>
      </tr>
    </tbody></table>
    </div>
    <div class="sampleDiv">
    <table><tbody>

      <tr>
        <td>
        {@aria:Button {
          label : "Confirm all",
          onclick : "leavePrefillState"
        } /}
        </td>
      </tr>
    </tbody></table>
  {/macro}


  {macro textMacro ()}
    {var weekday=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"] /}
    {var color = "black" /}
    {var value = data.value4 /}
    {var output = "" /}
    {if !value}
      {set color = "#DDDDDD" /}
      {set value = data.value3 /}
    {/if}
    {if value}
      {set output = weekday[value.getDay()] /}
    {/if}

    <div style="color:${color};">${output}</div>
  {/macro}

{macro main ()}

 {var myOptions = [{value : "EURO",
                    label : "France"
                   }, {
                    value : "FRANC SUISSE",
                    label : "Switzerland"
                   }, {
                    value : "POUND",
                    label : "United Kingdom"
                   }]/}

 {var myFancyOptions = [{value : "EURO",
                    label : "France"
                   }, {
                    value : "FRANC SUISSE",
                    label : "Switzerland",
                    attributes:{
                      disabled : "disabled"
                    }
                   }, {
                    value : "POUND",
                    label : "United Kingdom"
                   }]/}

 {var myStringOptions = ["EURO","FRANC SUISSE","POUND"]/}

<p>

We have 2 main types of select :
<br>
<br>
<h2>using the options property</h2>
<br>

<h3>binding the value</h3>
<br>
{@html:Select {
  attributes : {
    classList : ["stylish"]
  },
  options : myOptions,
  bind : {
    value : {
      inside : data,
      to : "selectedCurrency"
    }
  }
}/}
<br>
<br>

<h3>using an array of strings to create the select</h3>
<br>
Each string from you array will be used to fill 'label' and 'value' in the options tag
{@html:Select {
  attributes : {
    classList : ["stylish"]
  },
  options : myStringOptions,
  bind : {
    value : {
      inside : data,
      to : "selectedCurrency"
    }
  }
}/}
<br>


your options can have 3 different properties: a value, a label, and a set of attributes(here we disable the second item)
<br>
{@html:Select {
  attributes : {
    classList : ["stylish"]
  },
  options : myFancyOptions,
  bind : {
    value : {
      inside : data,
      to : "selectedCurrency"
    }
  }
}/}
<br>
<br>
<h3>binding the index</h3>
<br>

{@html:Select {
  attributes : {
    classList : ["stylish"]
  },
  options : myOptions,
  bind : {
    selectedIndex : {
      inside : data,
      to : "selectedIndex"
    }
  }
}/}
<br>
<div  style="background-color: yellow">
this section is bound to the selected index
<br>
{section {
  id : "displayCountindex",
  macro : "BoundIndex",
  bindRefreshTo : [
    {
      inside : data,
      to : "selectedIndex"
    }
  ]
}/}
</div
<br>
<br>

//same select implemented with a free html content
<h2>using an html body content</h2>
<br>
{@html:Select {
  attributes : {
    classList : ["stylish"]
  },
  bind : {
    value : {
      inside : data,
      to : "selectedCurrency"
    }
  }
}}
    {foreach option in myOptions}
        <option value="${option.value}">${option.label}</option>
    {/foreach}

{/@html:Select}
<br>
<br>
<div style="background-color: yellow">
this section is bound to the selected value
<br>
{section {
  id : "displayCount",
  macro : "BoundValue",
  bindRefreshTo : [
    {
      inside : data,
      to : "selectedCurrency"
    }
  ]
}/}
</div>
</p>

{/macro}

{macro BoundValue()}

Selected currency : <strong>${data.selectedCurrency}</strong> .

{/macro}

{macro BoundIndex()}

Selected index : <strong>${data.selectedIndex}</strong>.

{/macro}

  {macro main()}
    {call sectionBinding()/}
    <hr/>
    {var doInit = initCountIfNeeded() /}
    <br/>
    <b>Main macro:</b> Count=${data["view:count"]}<br/>

    {section "Section1"}
      <b>Section1:</b> Count=${data["view:count"]}
    {/section}<br/>

    {for var i=0;3>i;i++}
      {section "SectionX_"+i}
        <b>SectionX_${i}:</b> Count=${data["view:count"]}<br/>
        {for var j=0;2>j;j++}
          {section "SectionX_"+i+"_"+j}
            <b>SectionX_${i}_${j}:</b> Count=${data["view:count"]}
          {/section}<br/>
        {/for}
      {/section}
    {/for}
    {section "sectionMacroRefresh"}
      {call macroRefresh()/}
    {/section}<br/>

    <br/>
    {for var i=1;3>i;i++}
      // 2 Fields bound to the same data !
      {@aria:TextField {
        label:'Count Value (display #'+i+'):',
        tooltip:'Type any value to update the counter (note: you will need to explicitly call of a refresh to update non-bound data)',
        bind:{
          value:{to:"view:count", inside:data}
        }
      }/}
      <br/>
    {/for}
    <br/>

    Refresh:
    {@aria:Button {
      label:'All',
      onclick:'updateCountAndRefresh'
    }/}
    {@aria:Button {
      label:'Section1',
      onclick:{ fn: updateCountAndRefresh, args: {filterSection:"Section1"} }
    }/}
    {@aria:Button {
      label:'SectionX_1',
      onclick:{ fn: updateCountAndRefresh, args: {filterSection:"SectionX_1"} }
    }/}
    {@aria:Button {
      label:'SectionX_1_1',
      onclick:{ fn: updateCountAndRefresh, args: {filterSection:"SectionX_1_1"} }
    }/}
    {@aria:Button {
      label:'macroRefresh',
      onclick:{ fn: updateCountAndRefresh, args: {outputSection:"sectionMacroRefresh", macro: "macroRefresh"} }
    }/}


  {/macro}

  {macro macroRefresh()}
    <b>macroRefresh:</b> Count=${data["view:count"]}
  {/macro}

  {macro sectionBinding()}
    <h2>Section Bindings</h2>

    {section {
      id: "SectionA",
      bindRefreshTo : [{inside: data, to: "sectionRefresh"}]
    }}
      <p>
        {@aria:NumberField {
          label:"Bound Number field:",
          labelPos:"left",
          labelAlign:"right",
          block:true,
          value:'0',
          disabled: true,
          value:data['sectionRefresh'],
          errorMessages:["Please type in a number"]
        }/}
        <br/>
        {@aria:Button {
          label:"Increment value in datamodel ++",
          onclick: {
              fn: "onclickrefresh",
              args: "2"
          }
        }/}
      </p>
      <br/>
        {section "SectionA1"}
          <h2>Child Section</h2>
          <p>Bound number field should show <b>${data.sectionRefresh}</b></p>
        {/section}
      {call sectionBinding2()/}
    {/section}
  {/macro}
  {macro sectionBinding2()}
    {section "SectionA2"}
      <h2>Child Section within a sub macro</h2>
      <p>The bound number field should show <b>${data.sectionRefresh}</b></p>
    {/section}
  {/macro}

{var titleMessage = null /}

  {macro main()}
      <h2>Validator Groups</h2>
      The first name and last name fields validators are a member of group 1, and the phone number and email address fields validators are a member of group 2.
      <br>By clicking on one of the buttons below the associated group will be validated.
      {@aria:ErrorList {
        width: 650,
        margins: "10 1 10 1",
        title: "Success",
        filterTypes: ['O'],
        bind: {
          messages: {
            to: "errorMessages",
            inside: data
          }
        }
      }/}
      {@aria:ErrorList {
        width: 650,
        margins: "10 1 10 1",
        title: "Errors",
        filterTypes: ['E'],
        bind: {
          messages: {
            to: "errorMessages",
            inside: data
          }
        }
      }/}
        <br/>
        {@aria:TextField {
          label: "First Name:",
          labelWidth: 100,
          bind: {
            value: {
              to: "firstName",
              inside: data
            }
          }
        }/}
        <br/>
        {@aria:TextField {
          label: "Last Name:",
          labelWidth: 100,
          bind: {
            value: {
              to: "lastName",
              inside: data
            }
          }
        }/}
        <br/>
        {@aria:TextField {
          label: "Phone Number:",
          labelWidth: 100,
          bind: {
            value: {
              to: "phoneNumber",
              inside: data
            }
          }
        }/}
        <br/>
        {@aria:TextField {
          label: "Email Address:",
          labelWidth: 100,
          bind: {
            value: {
              to: "email",
              inside: data
            }
          }
        }/}
        <br/><br/>
        {@aria:Button {
          label: "Validate Group1",
          onclick: {
            fn : "submit",
            scope : moduleCtrl,
            args : ["group1"]
          }
        }/}
        {@aria:Button {
          label: "Validate Group2",
          onclick: {
            fn : "submit",
            scope : moduleCtrl,
            args : ["group2"]
          }
        }/}
        {@aria:Button {
          label: "Validate All",
          onclick: {
            fn : "submit",
            scope : moduleCtrl
          }
        }/}
  {/macro}

  {macro main ()}
  <table><tbody>
  <tr>
    <td>From</td><td>To</td><td>Date</td><td>Airlines</td>
  </tr>
  {foreach item inArray data.flights}
    <tr>
      <td>
      {@aria:AutoComplete {
        width:75,
        block:false,
        resourcesHandler: getCitiesHandler(3),
        preselect: "always",
        bind:{
            "value" : {
              inside : item.from,
              to : "value"
            },
            "prefill" : {
              inside : item.from,
              to : "prefill"
            }
        }
      }/}
      </td>
      <td>
      {@aria:AutoComplete {
        width:75,
        block:false,
        resourcesHandler: getCitiesHandler(3),
        preselect: "always",
        bind:{
            "value" : {
              inside : item.to,
              to : "value"
            },
            "prefill" : {
              inside : item.to,
              to : "prefill"
            }
        }
      }/}
      </td>
      <td>
      {@aria:DatePicker {
        bind : {
            "value" : {
              inside : item.date,
              to : "value"
            },
            "prefill" : {
              inside : item.date,
              to : "prefill"
            }
        }
      } /}
      </td>
      <td>
      {@aria:MultiSelect {
        activateSort: true,
        width:200,
        fieldDisplay: "code",
        fieldSeparator:',',
        valueOrderedByClick: true,
        maxOptions:7,
        numberOfRows:4,
        displayOptions : {
          flowOrientation:'horizontal',
          listDisplay: "both",
          displayFooter : true
        },
        items: this.data.items,
        bind:{
            "value" : {
              inside : item.airlines,
              to : "value"
            },
            "prefill" : {
              inside : item.airlines,
              to : "prefill"
            }
        }
      }/}
      </td>
      <td>
        {@aria:Button {
          label : "Remove",
          onclick : {fn : "removeSegment", scope : this, args : item.index}
        } /}
      </td>
    </tr>
  {/foreach}
  </tbody></table>

  <div>
  {@aria:Button {
    label : "Add segment",
    onclick : "addSegment"
  } /}
  </div>
  {/macro}

{var titleMessage = null /}

  {macro main()}
      <h2>Error Management</h2>
      - A Mandatory validator is used for all fields, and can be triggered onsubmit:
      <br/><br/>
      {@aria:ErrorList {
        defaultTemplate: "samples.utils.validators.basic.CustomizedErrorList",
        margins: "10 1 10 1",
        title: "Success",
        filterTypes: ['O'],
        bind: {
          messages: {
            to: "errorMessages",
            inside: data
          }
        }
      }/}
      {@aria:ErrorList {
        defaultTemplate: "samples.utils.validators.basic.CustomizedErrorList",
        margins: "10 1 10 1",
        title: "Information",
        filterTypes: ['I'],
        bind: {
          messages: {
            to: "errorMessages",
            inside: data
          }
        }
      }/}
      {@aria:ErrorList {
        defaultTemplate: "samples.utils.validators.basic.CustomizedErrorList",
        margins: "10 1 10 1",
        title: "Errors",
        filterTypes: ['E'],
        bind: {
          messages: {
            to: "errorMessages",
            inside: data
          }
        }
      }/}
      {@aria:TextField {
        label: "First Name:",
        labelWidth: 100,
        bind: {
          value: {
            to: "firstName",
            inside: data
          }
        }
      }/}
      <br/>
      {@aria:TextField {
        label: "Last Name:",
        labelWidth: 100,
        bind: {
          value: {
            to: "lastName",
            inside: data
          }
        }
      }/}
      <br/>
      {@aria:TextField {
        label: "Phone Number:",
        labelWidth: 100,
        bind: {
          value: {
            to: "phoneNumber",
            inside: data
          }
        }
      }/}
      <br/>
      {@aria:TextField {
        label: "Email Address:",
        labelWidth: 100,
        bind: {
          value: {
            to: "email",
            inside: data
          }
        }
      }/}
      <br/><br/>
      {@aria:Button {
        label: "Submit",
        onclick: {
          fn : "submit",
          scope : moduleCtrl
        }
      }/}
  {/macro}
{/Template}
