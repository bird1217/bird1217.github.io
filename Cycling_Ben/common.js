//陣列新增prototype 刪除元素
Array.prototype.remove = function (dx) {
    if (isNaN(dx) || dx > this.length) {
        return false;
    }

    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[dx]) {
            this[n++] = this[i];
        }
    }
    this.length -= 1;
};

// prototype：增加一个属性
String.prototype.replaceAll = function (s1, s2) {
    // g：执行全局匹配，而不是匹配第一个后停止。
    // m：执行多行匹配
    return this.replace(new RegExp(s1, "gm"), s2);
};

// #region 博格公版必要全域變數
var bRunInitScript = 'true';
// #endregion

var Services = [];
var xml_fieldValue;
var xml_bpmFieldData;
var empSelectorEnable = false;
var empSelector_EN = false;
var deptSelectorEnable = false;
var deptSelector_EN = false;

var commonManager = {
    submitMode:"",
    /*表單模式，applicant=起單、view=檢視、approveEdit=簽核時編輯*/
    formMode: "view",
    /*預設申請人為填單人*/
    setDefaultApplicant: function (data) {
        $("#applicantID").val(data.SYS_APPLOGONID);
        $("#applicantName").val(data.SYS_APPFULLNAME + "(" + data.SYS_APPLOGONID+")");
        $("#applicantDeptID").val(data.SYS_APPDEPTNO);
        $("#applicantDeptName").val(data.SYS_APPDEPTNAME);
        $("#applicantNO").val(data.SYS_CUST_1);
    },
    /*預設申請人為填單人*/
    setDefaultApplicant_EN: function (data) {
        $("#applicantID").val(data.SYS_APPLOGONID);
        $("#applicantName").val(data.SYS_APPFULLNAME + "(" + data.SYS_APPLOGONID + ")");
        $("#applicantDeptID").val(data.SYS_APPDEPTNO);
        $("#applicantDeptName").val(data.SYS_DEPTENGLISHNAME);
        $("#applicantNO").val(data.SYS_CUST_1);
    },
    /*取Template*/
    getTemplate: function (selector) {
        var html = $(selector).html();
        return $(html).clone();
    },
    /*連動式下拉*/
    interlockingSelect: {
        change: function ($this) {
            var id = $this.attr("id");
            var lv = parseInt(id.replace(/[^0-9]/ig, ""));
            var $option = $this.find("option:selected");
            var data = $option.attr("data");

            if (data) {
                var jData = JSON.parse(data);

                //判斷有無子階層
                if (jData.child) {
                    var childLV = lv + 1;
                    var childID = id.replace(/[0-9]/ig, childLV);
                    var $childSelect = $("#" + childID);

                    //清空option
                    $childSelect.empty();

                    //預設空白option
                    $childSelect.append("<option></option>");

                    //child option
                    jData.child.forEach(function (item, i) {
                        var option = $("<option>").val(item.value).text(item.text).attr("data", JSON.stringify(item));
                        $childSelect.append(option);
                    });
                }
            }
            else {
                var $next = $this.parents("div:eq(0)").next();

                if ($next.length > 0) {
                    //清空option
                    $next.find(".interlockingSelect").empty();

                    //預設空白option
                    $next.find(".interlockingSelect").append("<option></option>");
                }
            }
        }
    },
    /*jquery DataTable*/
    jqDataTable: {
        //jqDatatalbe 設定檔
        tableConfig: {
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": true,
            "autoWidth": false,
            "responsive": true,
            "width": "100%",
            "destroy":true,
            data: [],
            columns: [],
            paging: false,
            ordering: false,
            info: false
        },
        //jqDatatalbe 套用
        tableSetting: function (tableSelector, columns, datas, responsive, paging) {
            responsive = (typeof responsive !== 'undefined') ? responsive : true;
            paging = (typeof paging !== 'undefined') ? paging : true;

            /*jqDataTable 初始設置*/
            var $table = $(tableSelector);
            this.tableConfig.columns = columns;
            this.tableConfig.data = datas;
            this.tableConfig.responsive = responsive;
            this.tableConfig.paging = paging;

            
            //loading 啟動
            $table.loading("start");

            //套用
            var jqDataTable = $(tableSelector).attr("jqDataTable");
            if (jqDataTable) {
                commonManager.jqDataTable[jqDataTable] = $table.DataTable(this.tableConfig);
            }
            else {
                tableSelector = tableSelector.replace(".", "").replace("#", "");
                commonManager.jqDataTable[tableSelector] = $table.DataTable(this.tableConfig);
            }

            //loading 關閉
            $table.loading("stop");
        },
        //jqDatatalbe 新增一筆資料
        appendRow: function (tableSelector, rowData, detailField) {
            var dataTable = $(tableSelector).DataTable();

            dataTable.row.add(rowData).draw();

            this.updateDetailField(tableSelector, detailField);
        },
        //jqDatatalbe 編輯一筆資料
        editRow: function (tableSelector, rowData, rowIndex, detailField) {
            var dataTable = $(tableSelector).DataTable();

            dataTable.row(rowIndex).data(rowData).draw();

            this.updateDetailField(tableSelector, detailField);
        },
        //jqDatatalbe 刪除一筆資料
        delRow: function (tableSelector, rowIndex, detailField) {
            var dataTable = $(tableSelector).DataTable();
            var confirmStr = "確定刪除嗎？";

            if (empSelector_EN) {
                confirmStr = "Are you sure you want to delete?";
            }

            if (confirm(confirmStr)) {
                dataTable.row(rowIndex).remove().draw();

                this.reRowNum(tableSelector);

                this.updateDetailField(tableSelector, detailField);

                return true;
            }

            return false;
        },
        //jqDatatalbe 重新計算d_rowNum
        reRowNum: function (tableSelector) {
            var dataTable = $(tableSelector).DataTable();
            var rows = dataTable.rows();

            for (var i = 0; i < rows.count(); i++) {
                dataTable.row(i).data().d_rowNum = i + 1;
            }

            dataTable.draw();
        },
        //更新明細資料庫欄位
        updateDetailField: function (tableSelector, detailField) {
            var dataTable = $(tableSelector).DataTable();
            var rowsData = dataTable.rows().data();

            $(detailField).val(JSON.stringify(rowsData.toArray()));
        },
        calucKeepCurrentPage: function (tableSelector, rowIndex) {
            var quotient = parseInt((rowIndex + 1) / 10);
            var remainder = (((rowIndex + 1) % 10) > 0) ? 1 : 0;
            var index = (quotient + remainder) - 1;
            $(tableSelector).dataTable().fnPageChange(index);
        }
    },
    /*附件上傳*/
    fileUpload: {
        //defaultPath:"/FormDesigner/attach",
        /*上傳檔案 */
        upload: function ($this, files, subPath) {
          
            if (files.length > 0) {
                var targetID = $this.attr("file-target"); //<= 
                var savePath = $this.attr("savePath");
                var fileName = files[0].name;
                var uploadFilesTable = $("#_" + targetID + "_UploadFiles table");
                var guid = $("#guID").val();
                var filePath = savePath + "/" + guid + "/" + fileName;
                //var filePath = this.defaultPath + savePath + "/" + guid + "/" + fileName;

                if (subPath) {
                    filePath = savePath + "/" + guid + "/" + subPath + "/" + fileName;
                }

                //寫入欄位
                $("#" + targetID).val(filePath);

                // #region 上傳檔案
                // 建立一個新的 FormData 物件
                let formData = new FormData()

                // 追加新值到 FormData 物件已有的對應鍵上；若該鍵不存在，則為其追加新的鍵
                formData.append('FilePath', $("#" + targetID).val());
                formData.append('File', $("._" + targetID + "_UploadFile").get(0).files[0]);

                //清除file上傳紀錄
                //$("._" + targetID + "_UploadFile").val("");

                //呼叫 API 
                var response = apiManager.component.fileUpload(formData);

                if (response.msg) {
                    return false;
                }
                // #endregion   

                //清空顯示的TABLE
                uploadFilesTable.find("tbody").empty();

                //TEMPLATE
                var $temp = commonManager.getTemplate("#_" + targetID + "_fileListTemp");

                //TEMPLATE 替換字元置換
                var tempStr = $temp[0].outerHTML;
                tempStr = tempStr.replace("{{fileName}}", fileName);

                //塞入TABLE
                uploadFilesTable.find("tbody").append(tempStr);

                //顯示TABLE
                this.tableDisplay(targetID);
            }
        },
        multiUpload: function ($this, files, subPath) {

            
            if (files.length > 0) {
                var targetID = $this.attr("file-target"); //<-- fileDesc
                var savePath = $this.attr("savePath");
                var aryFiles = [];
                
                var uploadFilesTable = $("#_" + targetID + "_UploadFiles table");
                var newGuid = $("#guID").val();

              

                // #region 上傳檔案
                // 建立一個新的 FormData 物件
                
                for (var i = 0; i < files.length; i++) {
                    
                    var formData = new FormData()
                    var fileName = files[i].name;
                    var filePath = savePath + "/" + newGuid + "/" + fileName;
                    if (subPath) {
                        filePath = savePath + "/" + newGuid + "/" + subPath + "/" + fileName;
                    }
                    var fileObj = {};
                    fileObj["fileName"] = fileName;
                    fileObj["filePath"] = filePath;
                    aryFiles.push(fileObj);
                     
                    
                    formData.append('File', files[i]);
                    formData.append('FileName', fileName);
                    formData.append('FilePath', filePath);

                    

                    //呼叫 API
                    var response = apiManager.component.fileUpload(formData);

                    if (response.msg) {
                        return false;
                    }


                    //TEMPLATE
                    var $temp = commonManager.getTemplate("#_" + targetID + "_fileListTemp");

                    //TEMPLATE 替換字元置換
                    var tempStr = $temp[0].outerHTML;
                    //alert(commonManager.guid())
                    tempStr = tempStr.replaceAll("{{fileName}}", fileName).replaceAll("{{filePath}}", filePath).replaceAll("{{index}}", commonManager.guid().toString());
                    //塞入TABLE
                    //console.log(uploadFilesTable.find("tbody"))
                    uploadFilesTable.find("tbody").append(tempStr);

                }

                //寫入欄位 load first then set json



                //first time
                if ($("#" + targetID).val() == '')
                    $("#" + targetID).val(JSON.stringify(aryFiles));
                else {
                    //after save then open
                    var o = JSON.parse($("#" + targetID).val());
                    //console.log(o);

                    for (var i = 0; i < o.length; i++) {
                        aryFiles.push(o[i]);
                    }

                     
                    $("#" + targetID).val(JSON.stringify(aryFiles));
                    //alert($("#" + targetID).val())
                }
                
 
                // #endregion   

                //清空顯示的TABLE
                //uploadFilesTable.find("tbody").empty();
                this.tableDisplay(targetID);
                
            }
        },
        download: function ($this) {
            var targetID = $this.attr("file-target");

            // 建立一個新的 FormData 物件
            let formData = new FormData()

            // 追加新值到 FormData 物件已有的對應鍵上；若該鍵不存在，則為其追加新的鍵
            formData.append('FilePath', $("#" + targetID).val());
            
            //呼叫 API
            apiManager.component.downloadFile(formData);
        },
        downloadByMulti: function ($this) {
            
            // 建立一個新的 FormData 物件
            let formData = new FormData()

            // 追加新值到 FormData 物件已有的對應鍵上；若該鍵不存在，則為其追加新的鍵
            var filePath = $this.attr("file-path");
            formData.append('FilePath', filePath);

            //呼叫 API
            apiManager.component.downloadFile(formData);
        },
        /*刪除檔案 */
        deleteByMulti: function ($this) {
 
            var targetID = $this.attr("file-target"); //<-filedesc

            // #region 刪除檔案
            // 建立一個新的 FormData 物件
            let formData = new FormData()

            // 追加新值到 FormData 物件已有的對應鍵上；若該鍵不存在，則為其追加新的鍵

            var fileName = $this.attr("file-name");
            var filePath = $this.attr("file-path");

            formData.append('FilePath', filePath);
            formData.append('FileName', fileName);

            //呼叫 API
            var response = apiManager.component.deleteFile(formData);

            //var aryFiles = JSON.parse($("#" + targetID).val());
            var filesObj = null;
            //alert($("#hidJson").val())
            //if ($("#hidJson").val() != '') {
            //    var hidJsonObj = JSON.parse($("#hidJson").val());
            //    filesObj = JSON.parse(hidJsonObj.mTable[targetID]);
            //} else {
                filesObj = JSON.parse($("#" + targetID).val());
            //}
            

            //for (var key in aryFiles) {
            //    if (aryFiles[key]["fileName"] == fileName) { 
            //        aryFiles.splice(key, 1)    //javasript fun刪除或取代陣列中的值)
            //    }
            //}
            for (var key in filesObj) {
                if (filesObj[key]["fileName"] == fileName) {
                    filesObj.splice(key, 1)    //javasript fun刪除或取代陣列中的值)
                }
            }
            //if ($("#hidJson").val() != '') {
            //    hidJsonObj.mTable[targetID] = JSON.stringify(filesObj);
            //    $("#hidJson").val(JSON.stringify(hidJsonObj));
            //}  
            $("#" + targetID).val(JSON.stringify(filesObj))
            
            

            //console.log($("#hidJson").val())

            if (response.msg) {
                return false;
            }
            // #endregion

            //清空欄位
            //$("#" + targetID).val("");
            //$("._" + targetID + "_UploadFile").val("");

            $this.parents(".fileList_Row:eq(0)").remove();

            this.tableDisplay(targetID);
             
        },
        /*刪除檔案 */
        delete: function ($this) {
            var targetID = $this.attr("file-target");

            // #region 刪除檔案
            // 建立一個新的 FormData 物件
            let formData = new FormData()

            // 追加新值到 FormData 物件已有的對應鍵上；若該鍵不存在，則為其追加新的鍵
            formData.append('FilePath', $("#" + targetID).val());
            formData.append('FileName', $this.parents(".fileList_Row:eq(0)").find("a:eq(0)").text().trim());

            //呼叫 API
            var response = apiManager.component.deleteFile(formData);

            if (response.msg) {
                return false;
            }
            // #endregion

            //清空欄位
            $("#" + targetID).val("");
            $("._" + targetID + "_UploadFile").val("");

            $this.parents(".fileList_Row:eq(0)").remove();

            this.tableDisplay(targetID);
        },
        /*刪除檔案 */
        deleteByFilePath: function (FilePath) {
            if (FilePath) {
                var FileName = FilePath.split("/").pop();

                // 建立一個新的 FormData 物件
                let formData = new FormData()

                // 追加新值到 FormData 物件已有的對應鍵上；若該鍵不存在，則為其追加新的鍵
                formData.append('FilePath', FilePath);
                formData.append('FileName', FileName);

                //呼叫 API
                var response = apiManager.component.deleteFile(formData);

                if (response.msg) {
                    alert(response.msg);
                }
            }
        },
        /*瀏覽表單時顯示檔案清單*/
        showList: function (targetID) {
            var filePath = "";
            var filePaths = [];
            var targetVal = $("#" + targetID).val();

            if (targetVal) {
                filePath = targetVal;
            }
            else if (xml_bpmFieldData) {
                var fileTag = xml_bpmFieldData.getElementsByTagName(targetID.toUpperCase())[0];
                if (fileTag) {
                    if (!fileTag.firstChild) {
                        $("#_btn_" + targetID + "_UploadFile").addClass("hide");
                        return;
                    }
                    else {
                        filePath = fileTag.firstChild.nodeValue
                    }
                }
                else {
                    return;
                }
            }
            else {
                return;
            }


            try {
                var filePathArr = JSON.parse(filePath);

                filePathArr.forEach(function (item, i) {
                    filePaths.push(item.filePath);
                });
            } catch (e) {
                filePaths = [filePath];
            }

            //清空顯示的TABLE
            var uploadFilesTable = $("#_" + targetID + "_UploadFiles table");
            uploadFilesTable.find("tbody").empty();

            //TEMPLATE
            var $temp = commonManager.getTemplate("#_" + targetID + "_fileListTemp");
            $temp.find("[name=_btn_" + targetID + "_DeleteFile]").addClass("hide");

            filePaths.forEach(function (filePathItem, i) {
                var fileName = filePathItem.split("/").pop();

                //TEMPLATE 替換字元置換
                var $newTemp = $temp;
                var tempStr = $newTemp[0].outerHTML;
                tempStr = tempStr.replaceAll("{{fileName}}", fileName).replaceAll("{{filePath}}", filePathItem).replaceAll("{{index}}", i);

                //塞入TABLE
                uploadFilesTable.find("tbody").append(tempStr);
            });

            /*
            var fileName = filePath.split("/").pop();
            var uploadFilesTable = $("#_" + targetID + "_UploadFiles table");

            //清空顯示的TABLE
            uploadFilesTable.find("tbody").empty();

            //TEMPLATE
            var $temp = commonManager.getTemplate("#_" + targetID + "_fileListTemp");
            $temp.find("[name=_btn_" + targetID + "_DeleteFile]").addClass("hide");

            //TEMPLATE 替換字元置換
            var tempStr = $temp[0].outerHTML;
            tempStr = tempStr.replace("{{fileName}}", fileName);

            //塞入TABLE
            uploadFilesTable.find("tbody").append(tempStr);
            */

            //顯示TABLE
            this.tableDisplay(targetID);
                
        },
        /*檔案清單顯示控制 */
        tableDisplay: function (targetID) {
            var $btn = $("#_btn_" + targetID + "_UploadFile");
            var $table = $("#_" + targetID + "_UploadFiles table");
            var trLength = $table.find("tr").length;

            if (trLength > 0) {
                $table.parents(".uploadFilesDiv:eq(0)").show();
                $btn.hide();
            }
            else {
                $table.parents(".uploadFilesDiv:eq(0)").hide();
                $btn.show();
            }
        }
    },
    /*產生GUID*/
    guid: function () {
        var d = Date.now();

        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available
        }

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);

            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    },
    /*字串轉XML*/
    convert_string_to_xml: function (strXML) {
        if (window.ActiveXObject) {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = "false";
            xmlDoc.loadXML(strXML);
            return xmlDoc;
        } else {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(strXML, "text/xml");
            return xmlDoc;
        }
    },
    /*預設選擇器(人員、部門)*/
    defaultSelector: {
        emp: {
            /*必要：index.cshtml @Html.singleSelector("empSelector");*/
            open: function () {
                if (empSelectorEnable) {
                    var modalTitle = "人員選擇器";
                    var selectorID = "empSelector";

                    if (empSelector_EN) {
                        modalTitle = "Employee";
                        selectorID = "empSelector_EN";
                    }

                    //設定modal大小
                    modalManager.modalSize2("modal-md");

                    //隱藏按鈕
                    $("#openModal2 .modal-footer").addClass("hide");

                    //開啟modal
                    modalManager.openModalTemplate2(modalTitle, commonManager.getTemplate("." + selectorID));

                    // #region jqDataTable綁定
                    //欄位與資料的對應
                    var columns = [
                        { data: "EMP_NO" },
                        {
                            data: null,
                            render: function (data, type, obj, meta) {
                                return obj["EMP_NAME"] + "(" + obj["LOGIN_NAME"] + ")";
                            }
                        },
                        { data: empSelector_EN ? "DEPT_NAME_EN" : "DEPT_NAME" }
                    ];
                    var datas = [];
                    var empInfo = apiManager.data.get(_apiUri + "/Organization/GetEmpInfo/HQ");

                    if (empInfo.data.datas.length > 0) {
                        datas = empInfo.data.datas;
                    }

                    commonManager.jqDataTable.tableConfig.ordering = false; //停用排序
                    commonManager.jqDataTable.tableConfig.searching = true;//啟用搜尋

                    //明細初始設置
                    commonManager.jqDataTable.tableSetting(".jqDataTable_" + selectorID, columns, datas);

                    commonManager.jqDataTable.tableConfig.searching = false;//回復搜尋設定
                    // #endregion

                    //ROW CLICK
                    $(".jqDataTable_" + selectorID + " tbody").on("click", "tr", function () {
                        $(this).parents("tbody:eq(0)").find("tr").removeClass("selected");
                        $(this).toggleClass("selected");

                        var thisData = commonManager.jqDataTable[selectorID].row($(this)).data();
                        commonManager.defaultSelector.emp.returnItem(thisData);

                        //關閉MODAL
                        $(this).parents(".modal:eq(0)").modal('toggle');
                    });
                }
                else {
                    alert("未引用人員選擇器！");
                    /*
                    <!--人員選擇器-->
                    @Html.singleSelector("empSelector");
                */
                }
            },
            openMulti: function () {
                if (empSelectorEnable) {
                    var modalTitle = "人員選擇器";
                    var selectorID = "empSelector";

                    if (empSelector_EN) {
                        modalTitle = "Employee";
                        selectorID = "empSelector_EN";
                    }

                    //設定modal大小
                    modalManager.modalSize2("modal-md");

                    //隱藏按鈕
                    $("#openModal2 .modal-footer").addClass("hide");

                    //開啟modal
                    modalManager.openModalTemplate2(modalTitle, commonManager.getTemplate("." + selectorID));

                    // #region jqDataTable綁定
                    //欄位與資料的對應
                    var columns = [
                        { data: "EMP_NO" },
                        {
                            data: null,
                            render: function (data, type, obj, meta) {
                                return obj["EMP_NAME"] + "(" + obj["LOGIN_NAME"] + ")";
                            }
                        },
                        { data: empSelector_EN ? "DEPT_NAME_EN" : "DEPT_NAME" }
                    ];
                    var datas = [];
                    var empInfo = apiManager.data.get(_apiUri + "/Organization/GetEmpInfo/HQ");

                    if (empInfo.data.datas.length > 0) {
                        datas = empInfo.data.datas;
                    }

                    commonManager.jqDataTable.tableConfig.ordering = false; //停用排序
                    commonManager.jqDataTable.tableConfig.searching = true;//啟用搜尋

                    //明細初始設置
                    commonManager.jqDataTable.tableSetting(".jqDataTable_" + selectorID, columns, datas);

                    commonManager.jqDataTable.tableConfig.searching = false;//回復搜尋設定
                    // #endregion

                    //ROW CLICK
                    $(".jqDataTable_" + selectorID + " tbody").on("click", "tr", function () {
                        $(this).parents("tbody:eq(0)").find("tr").removeClass("selected");
                        $(this).toggleClass("selected");

                        var thisData = commonManager.jqDataTable.empSelector.row($(this)).data();
                        commonManager.defaultSelector.emp.returnItem(thisData);

                        //關閉MODAL
                        //$(this).parents(".modal:eq(0)").modal('toggle');
                    });
                }
                else {
                    alert("未引用人員選擇器！");
                    /*
                    <!--人員選擇器-->
                    @Html.singleSelector("empSelector");
                */
                }
            },
            returnItem: function (thisData) { }
        },
        empAll: {    
            // 包含已經離職同仁也要撈
            /*必要：index.csh tml @Html.singleSelector("empSelector");*/
            open: function () {
                if (empSelectorEnable) {
                    //設定modal大小
                    modalManager.modalSize2("modal-md");

                    //隱藏按鈕
                    $("#openModal2 .modal-footer").addClass("hide");

                    //開啟modal
                    modalManager.openModalTemplate2("人員選擇器", commonManager.getTemplate(".empSelector"));

                    // #region jqDataTable綁定
                    //欄位與資料的對應
                    var columns = [
                        { data: "EMP_NO" },
                        {
                            data: null,
                            render: function (data, type, obj, meta) {
                                return obj["EMP_NAME"] + "(" + obj["LOGIN_NAME"] + ")";
                            }
                        },
                        { data: "DEPT_NAME" }
                    ];
                    var datas = [];
                    var empInfo = apiManager.data.get(_apiUri + "/Organization/GetEmpInfo/ActiveAll");

                    if (empInfo.data.datas.length > 0) {
                        datas = empInfo.data.datas;
                    }

                    commonManager.jqDataTable.tableConfig.ordering = false; //停用排序
                    commonManager.jqDataTable.tableConfig.searching = true;//啟用搜尋

                    //明細初始設置
                    commonManager.jqDataTable.tableSetting(".jqDataTable_empSelector", columns, datas);

                    commonManager.jqDataTable.tableConfig.searching = false;//回復搜尋設定
                    // #endregion

                    //ROW CLICK
                    $(".jqDataTable_empSelector tbody").on("click", "tr", function () {
                        $(this).parents("tbody:eq(0)").find("tr").removeClass("selected");
                        $(this).toggleClass("selected");

                        var thisData = commonManager.jqDataTable.empSelector.row($(this)).data();
                        commonManager.defaultSelector.empAll.returnItem(thisData);

                        //關閉MODAL
                        $(this).parents(".modal:eq(0)").modal('toggle');
                    });
                }
                else {
                    alert("未引用人員選擇器！");
                    /*
                    <!--人員選擇器-->
                    @Html.singleSelector("empSelector");
                */
                }
            },
          
            returnItem: function (thisData) { }
        },
        empAll2: {
            // 包含已經離職同仁也要撈
            /*必要：index.csh tml @Html.singleSelector("empSelector");*/
            open: function () {
                if (empSelectorEnable) {
                    //設定modal大小
                    modalManager.modalSize2("modal-md");

                    //隱藏按鈕
                    $("#openModal2 .modal-footer").addClass("hide");

                    //開啟modal
                    modalManager.openModalTemplate2("人員選擇器", commonManager.getTemplate(".empSelector"));

                    // #region jqDataTable綁定
                    //欄位與資料的對應
                    var columns = [
                        { data: "EMP_NO" },
                        {
                            data: null,
                            render: function (data, type, obj, meta) {
                                return obj["EMP_NAME"] + "(" + obj["LOGIN_NAME"] + ")";
                            }
                        },
                        { data: "DEPT_NAME" }
                    ];
                    var datas = [];
                    var empInfo = apiManager.data.get(_apiUri + "/Organization/GetEmpInfo/ActiveAll2");

                    if (empInfo.data.datas.length > 0) {
                        datas = empInfo.data.datas;
                    }

                    commonManager.jqDataTable.tableConfig.ordering = false; //停用排序
                    commonManager.jqDataTable.tableConfig.searching = true;//啟用搜尋

                    //明細初始設置
                    commonManager.jqDataTable.tableSetting(".jqDataTable_empSelector", columns, datas);

                    commonManager.jqDataTable.tableConfig.searching = false;//回復搜尋設定
                    // #endregion

                    //ROW CLICK
                    $(".jqDataTable_empSelector tbody").on("click", "tr", function () {
                        $(this).parents("tbody:eq(0)").find("tr").removeClass("selected");
                        $(this).toggleClass("selected");

                        var thisData = commonManager.jqDataTable.empSelector.row($(this)).data();
                        commonManager.defaultSelector.empAll2.returnItem(thisData);

                        //關閉MODAL
                        $(this).parents(".modal:eq(0)").modal('toggle');
                    });
                }
                else {
                    alert("未引用人員選擇器！");
                    /*
                    <!--人員選擇器-->
                    @Html.singleSelector("empSelector");
                */
                }
            },

            returnItem: function (thisData) { }
        },
        empAll3: {
            /*必要：index.cshtml @Html.singleSelector("empSelector");*/
            open: function () {
                if (empSelectorEnable) {
                    var modalTitle = "人員選擇器";
                    var selectorID = "empSelector";

                    if (empSelector_EN) {
                        modalTitle = "Employee";
                        selectorID = "empSelector_EN";
                    }

                    //設定modal大小
                    modalManager.modalSize2("modal-md");

                    //隱藏按鈕
                    $("#openModal2 .modal-footer").addClass("hide");

                    //開啟modal
                    modalManager.openModalTemplate2(modalTitle, commonManager.getTemplate("." + selectorID));

                    // #region jqDataTable綁定
                    //欄位與資料的對應
                    var columns = [
                        { data: "EMP_NO" },
                        {
                            data: null,
                            render: function (data, type, obj, meta) {
                                return obj["EMP_NAME"] + "(" + obj["LOGIN_NAME"] + ")";
                            }
                        },
                        { data: empSelector_EN ? "DEPT_NAME_EN" : "DEPT_NAME" }
                    ];
                    var datas = [];
                    var empInfo = apiManager.data.get(_apiUri + "/Organization/GetEmpInfo/ALL");

                    if (empInfo.data.datas.length > 0) {
                        datas = empInfo.data.datas;
                    }

                    commonManager.jqDataTable.tableConfig.ordering = false; //停用排序
                    commonManager.jqDataTable.tableConfig.searching = true;//啟用搜尋

                    //明細初始設置
                    commonManager.jqDataTable.tableSetting(".jqDataTable_" + selectorID, columns, datas);

                    commonManager.jqDataTable.tableConfig.searching = false;//回復搜尋設定
                    // #endregion

                    //ROW CLICK
                    $(".jqDataTable_" + selectorID + " tbody").on("click", "tr", function () {
                        $(this).parents("tbody:eq(0)").find("tr").removeClass("selected");
                        $(this).toggleClass("selected");

                        var thisData = commonManager.jqDataTable[selectorID].row($(this)).data();
                        commonManager.defaultSelector.emp.returnItem(thisData);

                        //關閉MODAL
                        $(this).parents(".modal:eq(0)").modal('toggle');
                    });
                }
                else {
                    alert("未引用人員選擇器！");
                    /*
                    <!--人員選擇器-->
                    @Html.singleSelector("empSelector");
                */
                }
            },
            openMulti: function () {
                if (empSelectorEnable) {
                    var modalTitle = "人員選擇器";
                    var selectorID = "empSelector";

                    if (empSelector_EN) {
                        modalTitle = "Employee";
                        selectorID = "empSelector_EN";
                    }

                    //設定modal大小
                    modalManager.modalSize2("modal-md");

                    //隱藏按鈕
                    $("#openModal2 .modal-footer").addClass("hide");

                    //開啟modal
                    modalManager.openModalTemplate2(modalTitle, commonManager.getTemplate("." + selectorID));

                    // #region jqDataTable綁定
                    //欄位與資料的對應
                    var columns = [
                        { data: "EMP_NO" },
                        {
                            data: null,
                            render: function (data, type, obj, meta) {
                                return obj["EMP_NAME"] + "(" + obj["LOGIN_NAME"] + ")";
                            }
                        },
                        { data: empSelector_EN ? "DEPT_NAME_EN" : "DEPT_NAME" }
                    ];
                    var datas = [];
                    var empInfo = apiManager.data.get(_apiUri + "/Organization/GetEmpInfo/ALL");

                    if (empInfo.data.datas.length > 0) {
                        datas = empInfo.data.datas;
                    }

                    commonManager.jqDataTable.tableConfig.ordering = false; //停用排序
                    commonManager.jqDataTable.tableConfig.searching = true;//啟用搜尋

                    //明細初始設置
                    commonManager.jqDataTable.tableSetting(".jqDataTable_" + selectorID, columns, datas);

                    commonManager.jqDataTable.tableConfig.searching = false;//回復搜尋設定
                    // #endregion

                    //ROW CLICK
                    $(".jqDataTable_" + selectorID + " tbody").on("click", "tr", function () {
                        $(this).parents("tbody:eq(0)").find("tr").removeClass("selected");
                        $(this).toggleClass("selected");

                        var thisData = commonManager.jqDataTable.empSelector.row($(this)).data();
                        commonManager.defaultSelector.emp.returnItem(thisData);

                        //關閉MODAL
                        //$(this).parents(".modal:eq(0)").modal('toggle');
                    });
                }
                else {
                    alert("未引用人員選擇器！");
                    /*
                    <!--人員選擇器-->
                    @Html.singleSelector("empSelector");
                */
                }
            },
            returnItem: function (thisData) { }
        },
        empHR: {
            // 包含HR
            /*必要：index.csh tml @Html.singleSelector("empSelector");*/
            open: function () {

                if (empSelectorEnable) {
                    //設定modal大小
                    modalManager.modalSize2("modal-md");

                    //隱藏按鈕
                    $("#openModal2 .modal-footer").addClass("hide");

                    //開啟modal
                    modalManager.openModalTemplate2("人員選擇器", commonManager.getTemplate(".empSelector"));

                    // #region jqDataTable綁定
                    //欄位與資料的對應
                    var columns = [
                        { data: "EMP_NO" },
                        {
                            data: null,
                            render: function (data, type, obj, meta) {
                                return obj["EMP_NAME"] + "(" + obj["LOGIN_NAME"] + ")";
                            }
                        },
                        { data: "DEPT_NAME" }
                    ];
                    var datas = [];
                    var empInfo = apiManager.data.get(_apiUri + "/Organization/GetEmpInfo/HR");

                    if (empInfo.data.datas.length > 0) {
                        datas = empInfo.data.datas;
                    }

                    commonManager.jqDataTable.tableConfig.ordering = false; //停用排序
                    commonManager.jqDataTable.tableConfig.searching = true;//啟用搜尋

                    //明細初始設置
                    commonManager.jqDataTable.tableSetting(".jqDataTable_empSelector", columns, datas);

                    commonManager.jqDataTable.tableConfig.searching = false;//回復搜尋設定
                    // #endregion

                    //ROW CLICK
                    $(".jqDataTable_empSelector tbody").on("click", "tr", function () {
                        $(this).parents("tbody:eq(0)").find("tr").removeClass("selected");
                        $(this).toggleClass("selected");

                        var thisData = commonManager.jqDataTable.empSelector.row($(this)).data();
                        commonManager.defaultSelector.empHR.returnItem(thisData);

                        //關閉MODAL
                        $(this).parents(".modal:eq(0)").modal('toggle');
                    });
                }
                else {
                    alert("未引用人員選擇器！");
                    /*
                    <!--人員選擇器-->
                    @Html.singleSelector("empSelector");
                */
                }
            },

            returnItem: function (thisData) { }
        },
        dept: {
            /*必要：index.cshtml @Html.singleSelector("deptSelector");*/
            open: function () {
                if (deptSelectorEnable) {
                    var modalTitle = "部門選擇器";
                    var selectorID = "deptSelector";

                    if (deptSelector_EN) {
                        modalTitle = "Department";
                        selectorID = "deptSelector_EN";
                    }

                    //設定modal大小
                    modalManager.modalSize2("modal-md");

                    //隱藏按鈕
                    $("#openModal2 .modal-footer").addClass("hide");

                    //開啟modal
                    modalManager.openModalTemplate2(modalTitle, commonManager.getTemplate("." + selectorID));

                    // #region jqDataTable綁定
                    //欄位與資料的對應
                    var columns = [
                        { data: "DEPT_CODE" },
                        { data: deptSelector_EN ? "DEPT_NAME_EN" : "DEPT_NAME" }
                    ];
                    var datas = [];
                    var empInfo = apiManager.data.get(_apiUri + "/Organization/GetDeptInfo/HQ");

                    if (empInfo.data.datas.length > 0) {
                        datas = empInfo.data.datas;
                    }

                    commonManager.jqDataTable.tableConfig.ordering = false; //停用排序
                    commonManager.jqDataTable.tableConfig.searching = true;//啟用搜尋

                    //明細初始設置
                    commonManager.jqDataTable.tableSetting(".jqDataTable_" + selectorID, columns, datas);

                    commonManager.jqDataTable.tableConfig.searching = false;//回復搜尋設定
                    // #endregion

                    //ROW CLICK
                    $(".jqDataTable_" + selectorID + " tbody").on("click", "tr", function () {
                        $(this).parents("tbody:eq(0)").find("tr").removeClass("selected");
                        $(this).toggleClass("selected");

                        var thisData = commonManager.jqDataTable[selectorID].row($(this)).data();
                        commonManager.defaultSelector.dept.returnItem(thisData);

                        //關閉MODAL
                        $(this).parents(".modal:eq(0)").modal('toggle');
                    });
                }
                else {
                    alert("未引用部門選擇器！");
                    /*
                    <!--部門選擇器-->
                    @Html.singleSelector("deptSelector");
                    */
                }
            },
            returnItem: function (thisData) { }
        },
        deptAll: {
            /*必要：index.cshtml @Html.singleSelector("deptSelector");*/
            open: function () {
                if (deptSelectorEnable) {
                    var modalTitle = "部門選擇器";
                    var selectorID = "deptSelector";

                    if (deptSelector_EN) {
                        modalTitle = "Department";
                        selectorID = "deptSelector_EN";
                    }

                    //設定modal大小
                    modalManager.modalSize2("modal-md");

                    //隱藏按鈕
                    $("#openModal2 .modal-footer").addClass("hide");

                    //開啟modal
                    modalManager.openModalTemplate2(modalTitle, commonManager.getTemplate("." + selectorID));

                    // #region jqDataTable綁定
                    //欄位與資料的對應
                    var columns = [
                        { data: "DEPT_CODE" },
                        { data: deptSelectorEnable ? "DEPT_NAME_EN" : "DEPT_NAME" }
                    ];
                    var datas = [];
                    var empInfo = apiManager.data.get(_apiUri + "/Organization/GetDeptInfo/ALL");

                    if (empInfo.data.datas.length > 0) {
                        datas = empInfo.data.datas;
                    }

                    commonManager.jqDataTable.tableConfig.ordering = false; //停用排序
                    commonManager.jqDataTable.tableConfig.searching = true;//啟用搜尋

                    //明細初始設置
                    commonManager.jqDataTable.tableSetting(".jqDataTable_" + selectorID, columns, datas);

                    commonManager.jqDataTable.tableConfig.searching = false;//回復搜尋設定
                    // #endregion

                    //ROW CLICK
                    $(".jqDataTable_" + selectorID + " tbody").on("click", "tr", function () {
                        $(this).parents("tbody:eq(0)").find("tr").removeClass("selected");
                        $(this).toggleClass("selected");

                        var thisData = commonManager.jqDataTable[selectorID].row($(this)).data();
                        commonManager.defaultSelector.dept.returnItem(thisData);

                        //關閉MODAL
                        $(this).parents(".modal:eq(0)").modal('toggle');
                    });
                }
                else {
                    alert("未引用部門選擇器！");
                    /*
                    <!--部門選擇器-->
                    @Html.singleSelector("deptSelector");
                    */
                }
            },
            returnItem: function (thisData) { }
        },
        jsonData: {
            /*必要：index.cshtml @Html.singleSelector("deptSelector");*/
            modalSize: "modal-md",
            ordering: false,
            searching: true,
            tableSetting: function (thLsit) {
                 //thLsit:table title字串陣列

                var $temp = commonManager.getTemplate(".jsonDataSelector")

                //判斷是否有引用
                if ($temp.length > 0) {
                    //var thLsit = ["工號", "名字", "部門"];
                    var $jqDataTable = $temp.find(".jqDataTable_jsonDataSelector");
                    var $th = $jqDataTable.find("thead th:eq(0)");
                    var mix = '';

                    thLsit.forEach(function (item, i) {
                        var $newTH = $th.clone();
                        $newTH.text(item);

                        mix += $newTH[0].outerHTML
                    });

                    $jqDataTable.find("thead tr").empty();
                    $jqDataTable.find("thead tr").append(mix);

                    //回寫到TEMPLATE
                    var $content = $($(".jsonDataSelector").prop('content'));
                    $content.find(".singleSelector").empty()
                    $content.find(".singleSelector").append($jqDataTable[0].outerHTML);
                }
            },
            open: function (modalTitle, columns, jsonData) {
                //modalTitle:modal標題
                //modalTemplate:table範本，
                //columns:jqDatatable欄位綁定
                //jsonData:jsonData

                //設定modal大小
                modalManager.modalSize2(this.modalSize);

                //隱藏按鈕
                $("#openModal2 .modal-footer").addClass("hide");

                //開啟modal
                modalManager.openModalTemplate2(modalTitle, commonManager.getTemplate(".jsonDataSelector"));

                // #region jqDataTable綁定
                //欄位與資料的對應
                //var columns = [
                //    { data: "EMP_NO" },
                //    {
                //        data: null,
                //        render: function (data, type, obj, meta) {
                //            return obj["EMP_NAME"] + "(" + obj["LOGIN_NAME"] + ")";
                //        }
                //    },
                //    { data: "DEPT_NAME" }
                //];

                commonManager.jqDataTable.tableConfig.ordering = this.ordering; //停用排序
                commonManager.jqDataTable.tableConfig.searching = this.searching;//啟用搜尋

                //明細初始設置
                commonManager.jqDataTable.tableSetting(".jqDataTable_jsonDataSelector", columns, jsonData);

                commonManager.jqDataTable.tableConfig.searching = false;//回復搜尋設定
                // #endregion

                //ROW CLICK
                $(".jqDataTable_jsonDataSelector tbody").on("click", "tr", function () {
                    $(this).parents("tbody:eq(0)").find("tr").removeClass("selected");
                    $(this).toggleClass("selected");

                    var thisData = commonManager.jqDataTable.jsonDataSelector.row($(this)).data();
                    commonManager.defaultSelector.emp.returnItem(thisData);

                    //關閉MODAL
                    $(this).parents(".modal:eq(0)").modal('toggle');
                });

                $(".jqDataTable_jsonDataSelector").parent().parent().css("overflow", "auto");
            },
            openMulti: function (modalTitle, columns, jsonData, selected) {
                selected = (typeof selected !== 'undefined') ? selected : true;

                if (empSelectorEnable) {
                    //設定modal大小
                    modalManager.modalSize2(this.modalSize);

                    //隱藏按鈕
                    $("#openModal2 .modal-footer").addClass("hide");

                    //開啟modal
                    modalManager.openModalTemplate2(modalTitle, commonManager.getTemplate(".jsonDataSelector"));

                    commonManager.jqDataTable.tableConfig.ordering = this.ordering; //停用排序
                    commonManager.jqDataTable.tableConfig.searching = this.searching;//啟用搜尋

                    //明細初始設置
                    commonManager.jqDataTable.tableSetting(".jqDataTable_jsonDataSelector", columns, jsonData);

                    commonManager.jqDataTable.tableConfig.searching = false;//回復搜尋設定
                    // #endregion

                    //ROW CLICK
                    $(".jqDataTable_jsonDataSelector tbody").on("click", "tr", function () {
                        $(this).parents("tbody:eq(0)").find("tr").removeClass("selected");

                        if (selected) {
                            $(this).toggleClass("selected");
                        }

                        var thisData = commonManager.jqDataTable.jsonDataSelector.row($(this)).data();
                        commonManager.defaultSelector.emp.returnItem(thisData);

                        ////關閉MODAL
                        //$(this).parents(".modal:eq(0)").modal('toggle');
                    });

                    $(".jqDataTable_jsonDataSelector").parent().parent().css("overflow", "auto");
                }
            },
            returnItem: function (thisData) { }
        }
    },
    /*表單識別碼*/
    identify: "",
    /*表單載入後事件*/
    formOnLoad: function () { },
    /*表單載入後最後事件*/
    formAfterLoad: function () { },
    /*取得M表欄位資料*/
    get_mTableData: function() {
        var get_mTableData = {};

        $("form#form1").find(".mTable").each(function () {
            var objKey = $(this).attr("name") || $(this).attr("id");

            if ($(this).attr("type") == "checkbox") {
                if (!get_mTableData[objKey]) {
                    var TmpStr = "";

                    $("[name=" + objKey + "]:checked").each(function () {

                        if (TmpStr == "") {
                            TmpStr += $(this).val();
                        }
                        else {
                            TmpStr += "," + $(this).val();
                        }
                    });

                    //名稱放入塞入物件
                    get_mTableData[objKey] = TmpStr;
                }
            }
            else if ($(this).attr("type") == "radio") {
                get_mTableData[objKey] = $("[name=" + objKey + "]:checked").val();
            }
            else if (!$(this).val()) {
                get_mTableData[objKey] = null;
            }
            else {
                get_mTableData[objKey] = $(this).val();
            }
        });

        return get_mTableData;
    },
    /*將M表欄位資料帶回*/
    set_mTableData: function () {
        if (!$("#hidJson").val()) {
            return false;
        }

        var hidJsonObj = JSON.parse($("#hidJson").val());
        var mTableData = hidJsonObj.mTable;

        if (mTableData == undefined) {
            return false;
        }
        
        if (Object.keys(mTableData).length > 0) {
            $.each(mTableData, function (key, value) {
                var $filed = $("#");

                if ($("#" + key).length > 0) {
                    $filed = $("#" + key);
                }
                else if ($("[name=" + key + "]").length > 0) {
                    $filed = $("[name=" + key + "]");
                }

                var type = $filed.attr("type");                

                if (type == "checkbox") {
                    if (value) {
                        var valueArr = value.split(",");

                        $filed.prop("checked", false);

                        valueArr.forEach(function (item) {
                            if (item) {
                                $filed.parent().find("[value=" + item + "]").prop("checked", true);
                            }
                        });
                    }
                    else {
                        $filed.prop("checked", false);
                    }
                }
                else if (type == "radio") {
                    if (value) {
                        $filed.parent().find("[value=" + value + "]").prop("checked", true);
                    }
                }
                else if ($filed.attr("multiple") =="multiple") {
                    if (value) {
                        var valueArr = value.split(",");

                        $filed.val(valueArr).change();
                    }          
                }
                else {
                    $filed.val(value).change();
                }
            });
        }
    },
    /*將表單內容以JSON格式存到特定欄位(hidJson)*/
    setHidJsonData: function (identify) {
        var jsonData = {
            guID: $("#guID").val(),
            identify: this.identify,
            mTable: this.get_mTableData(),
            dTable1: $(".dataTable:visible:eq(0)").DataTable().rows().data().toArray()
        };
        
        $("#hidJson").val(JSON.stringify(jsonData));
    },
    /*表單檢核，檢核通過須回傳TRUE*/
    formValidate: function () {
        return true;
    },
    /*額外formSubmit事件*/
    formSubmit: function () {
        if (this.identify) {
            //表單檢核
            if (this.formValidate()) {
                this.setHidJsonData(); 
            }
            else {
                return false;
            }
        }
        else {
            alert("identify is empty.");
            return false;
        }

        return true;
    },
    /*四則運算，解決浮點數運算問題*/
    arithmetic: {
        //除法
        accDiv: function (arg1, arg2) {
            var t1 = 0, t2 = 0, r1, r2;
            try {
                t1 = arg1.toString().split(".")[1].length;
            } catch (e) { }
            try {
                t2 = arg2.toString().split(".")[1].length;
            } catch (e) { }
            with (Math) {
                r1 = Number(arg1.toString().replace(".", ""));
                r2 = Number(arg2.toString().replace(".", ""));
                return (r1 / r2) * pow(10, t2 - t1);
            }
        },
        //乘法
        accMul: function (arg1, arg2) {
            var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
            try {
                m += s1.split(".")[1].length;
            } catch (e) { }
            try {
                m += s2.split(".")[1].length;
            } catch (e) { }
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        },
        //加法
        accAdd: function (arg1, arg2) {
            var r1, r2, m;
            try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
            try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
            m = Math.pow(10, Math.max(r1, r2));
            return (arg1 * m + arg2 * m) / m;
        },
        //減法
        accSubtr: function (arg1, arg2) {
            var r1, r2, m, n;
            try {
                r1 = arg1.toString().split(".")[1].length;
            } catch (e) { r1 = 0 }
            try {
                r2 = arg2.toString().split(".")[1].length;
            } catch (e) { r2 = 0 }
            m = Math.pow(10, Math.max(r1, r2));
            n = (r1 >= r2) ? r1 : r2;
            return ((arg1 * m - arg2 * m) / m).toFixed(n);
        }
    },
    /*數字相關函式*/
    number: {
        //千分位解、小數位數轉換，data=值，math=小數後幾位
        toTenPercentile: function (data, math) {
            var value = data;

            if (data) {
                data = data.replaceAll(",", "");

                value = Number(
                    parseFloat(data).toFixed(math)
                ).toLocaleString("en", {
                    minimumFractionDigits: math
                });
            }

            return value;
        }
    },
    GroupByMultiKeySum: function(datas) {
        var helper = {};
        var result = datas.reduce(function (r, o) {
            var key = o.COST_CENTER_ID + '-' + o.GL_ACCT;

            if (!helper[key]) {
                helper[key] = Object.assign({}, o); // create a copy of o
                r.push(helper[key]);
            } else {
                helper[key].AMOUNT = parseFloat(helper[key].AMOUNT) + parseFloat(o.AMOUNT);
                helper[key].Budget = parseFloat(helper[key].Budget) + parseFloat(o.Budget);
            }

            return r;
        }, []);
        return result;
    },
    /*預算：成本中心+會計科目 檢核是否已超過可用預算*/
    checkIsOverBudget: function (datas) {
        var items = this.GroupByMultiKeySum(datas);

        var errMsg = "";
   
        items.forEach(function (item, i) {
            if (parseFloat(item.AMOUNT) > parseFloat(item.Budget)) {
                var newBudget = parseFloat(item.PlannedBudget) - parseFloat(item.ProcessingBudget) - parseFloat(item.UsedBudget);
                var plannedBudgetStr = commonManager.number.toTenPercentile(item.PlannedBudget.toString(), 2);
                var usedBudgetStr = commonManager.number.toTenPercentile(item.UsedBudget.toString(), 2);
                var processingBudgetStr = commonManager.number.toTenPercentile(item.ProcessingBudget.toString(), 2);
                var budgetStr = commonManager.number.toTenPercentile(newBudget.toString(), 2);
                var amountStr = commonManager.number.toTenPercentile(item.AMOUNT.toString(), 2);

                errMsg += "預算狀態：成本中心：" + item.COST_CENTER_ID + "，會計科目：" + item.GL_ACCT + "\n" +
                    "全年總預算:" + plannedBudgetStr + "\n" +
                    "已使用預算:" + usedBudgetStr + "\n" +
                    "在途費用:" + processingBudgetStr + "\n" +
                    "可用金額:" + budgetStr + "\n" +
                    "申請金額:" + amountStr + "\n";
            }
        });
     
        return errMsg;
    },
    GetNowNonFormate: function () {
        var now = new Date();
        return now.getFullYear().toString() + (now.getMonth() + 1).toString() + now.getDate().toString() + now.getHours().toString() + now.getMinutes().toString() + now.getSeconds().toString();
    },
    /*產生XLSX並下載*/
    downloadXLSX: function (datas, filename) {
        /* this line is only needed if you are not adding a script tag reference */
        if (typeof XLSX == 'undefined') {
            XLSX = require('xlsx');
            //alert("為引用套件。")
            //return false;
        }

        /* make the worksheet */
        var ws = XLSX.utils.json_to_sheet(datas);

        /* add to workbook */
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "sheet1");

        /* generate an XLSX file */
        XLSX.writeFile(wb, filename + ".xlsx");
    },
    /*開啟列印畫面*/
    printReport: function (selectorID) {
        var mywindow = window.open('', selectorID);

        mywindow.document.write('<html><head><title>' + document.title + '</title>');
        mywindow.document.write('</head><body >');
        mywindow.document.write('<h1>' + document.title + '</h1>');
        mywindow.document.write(document.getElementById('print').innerHTML);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();
    },
    getDateNowWithSymbol: function (symbol) {
        var date = new Date();
        var month = commonManager.padLeft((date.getMonth() + 1).toString(), 2, "0");
        var day = commonManager.padLeft(date.getDate().toString(), 2, "0");
        var year = date.getFullYear().toString();
        var hour = commonManager.padLeft(date.getHours().toString(), 2, "0");
        var min = commonManager.padLeft(date.getMinutes().toString(), 2, "0");
        var sec = commonManager.padLeft(date.getSeconds().toString(), 2, "0");

        return year + symbol + month + symbol + day + " " + hour + ":" + min + ":" + sec;
    },
    padLeft: function (value, lenght, char) {
        if (value.length >= lenght)
            return value;
        else
            return commonManager.padLeft(char + value, lenght, char);
    }
}

$(function () {
    //解決開啟兩個modal，scrollbar 會消失問題
    $(document).on('hidden.bs.modal', '.modal', function () {
        $('.modal:visible').length && $(document.body).addClass('modal-open');
    });

    // #region Services
    var servicesData = $("#Services").attr("data");
    
    if (servicesData) {
        try {
            Services = JSON.parse(servicesData);

            var str_fieldValue = Services.FIELDVALUE;

            xml_fieldValue = commonManager.convert_string_to_xml(str_fieldValue);
            xml_bpmFieldData = xml_fieldValue.getElementsByTagName("BPM_FieldData")[0];

        } catch (e) {
            //$('#Services').hide();
            console.log('jsonParse Error', e);
        } finally {

        }
        
    }

    // #endregion

    // #region GUID
    var guID = $("#guID").val();

    if (!guID) {
        $("#guID").val(commonManager.guid());
    }

    // #endregion

    //顯示上傳檔案清單
    $(".btn_fileupload").each(function () {
        var $fileField = $(this).parents("div:eq(0)").find(".fileField");
        var fieldID = $fileField.attr("id");

        commonManager.fileUpload.showList(fieldID);
    });

    //人員選擇器
    empSelector();

    //部門選擇器
    deptSelector();

    //申請人員
    $("#form1").delegate(".btn_empApplicant", "click", function () {
        commonManager.defaultSelector.emp.returnItem = function (thisData) {
            $("#applicantID").val(thisData.LOGIN_NAME).change();
            $("#applicantName").val(thisData.EMP_NAME + "(" + thisData.LOGIN_NAME + ")").change();
            $("#applicantDeptID").val(thisData.DEPT_CODE).change();
            $("#applicantDeptName").val(empSelector_EN ? thisData.DEPT_NAME_EN : thisData.DEPT_NAME).change();
            $("#applicantNO").val(thisData.EMP_NO).change();
        };

        commonManager.defaultSelector.emp.open();
    });

    // #region InterlockingSelect
    //$(".interlockingSelect").change(function () {
    //    var id = $(this).attr("id");
    //    var lv = parseInt(id.replace(/[^0-9]/ig, ""));
    //    var $option = $(this).find("option:selected");
    //    var data = $option.attr("data");
    //    var jData = JSON.parse(data);

    //    //判斷有無子階層
    //    if (jData.child) {
    //        var childLV = lv + 1;
    //        var childID = id.replace(/[0-9]/ig, childLV);
    //        var $childSelect = $("#" + childID);

    //        //清空option
    //        $childSelect.empty(); 

    //        //預設空白option
    //        $childSelect.append("<option></option>");

    //        //child option
    //        jData.child.forEach(function (item, i) {
    //            var option = $("<option>").val(item.value).text(item.text).attr("data", JSON.stringify(item));
    //            $childSelect.append(option); 
    //        });
    //    }
    //});
    // #endregion

    //表單送出事件
    $(".btnSend").click(function () {
        commonManager.submitMode = "send";

        if (!commonManager.formSubmit()) {
            throw "————————停止執行————————";
        }
    });

    //表單儲存事件
    $(".btnSave").click(function () {
        commonManager.submitMode = "save";

        if (!commonManager.formSubmit()) {
            throw "————————停止執行————————";
        }
    });

    //退簽時, 簽核意見必填
    if ($(".btnReturn:visible").length > 0) {
        $("#SelectReturnToModal").on('show.bs.modal', function (e) {
            if (!$(".txtOPINION").val()) {
                alert("退簽時, 簽核意見必填。")
                return false;
            }
        });
    }
});

window.onload = function () {
    //IsFormReady宣告在taskpane.js
    //表單資料未完成載入時，重新執行
    try {
        if (!IsFormReady) {
            setTimeout(function () {
                window.onload();
            }, 0);

            return false;
        }
    } catch (e) {
        console.log("非表單");
        return false;
    }

    var STEPNAME = Services.STEPNAME;
    var OPINION = Services.OPINION;

    //表單開始狀態
    if (STEPNAME == "開始" && !OPINION) {
        commonManager.formMode = "applicant";
    }

    //取得資料庫hidJSon
    //var spHidJson = apiManager.data.get(_apiUri + "/FormData/GetHidJson/" + Services.CASEID + "/" + Services.FORMSN);

    //if (!spHidJson.msg) {
    //    var hidJsonStr = spHidJson.data.datas;

    //    if (hidJsonStr) {
    //        $("#hidJson").val(hidJsonStr);
    //    }
    //}

    //表單載入後事件
    commonManager.formOnLoad();

    //將M表欄位資料帶回
    commonManager.set_mTableData();

    //強制不跳關,若需要跳關，給"JUMP"
    if ($("#Mode").val() == "JUMP") {
        $("#Mode").val("");
    }
	
	//顯示上傳檔案清單
    $(".btn_fileupload").each(function () {
        var $fileField = $(this).parents("div:eq(0)").find(".fileField");
        var fieldID = $fileField.attr("id");

        commonManager.fileUpload.showList(fieldID);
    });
	
    //表單載入後最後事件
    commonManager.formAfterLoad();
};

//人員選擇器
function empSelector() {
    var selectorID = "empSelector";
    var $temp = commonManager.getTemplate("." + selectorID);
    var thLsit = ["工號", "名字", "部門"];

    if ($(".empSelector_EN").length > 0) {
        empSelector_EN = true;
        selectorID = "empSelector_EN";
        $temp = commonManager.getTemplate("." + selectorID);
        thLsit = ["Employee No.", "Name", "Department"];
    }

    //console.log("lang", lang);
    //判斷是否有引用
    if ($temp.length > 0) {
        empSelectorEnable = true;
        var $jqDataTable = $temp.find(".jqDataTable_" + selectorID);
        var $th = $jqDataTable.find("thead th:eq(0)");
        var mix = '';

        thLsit.forEach(function (item, i) {
            var $newTH = $th.clone();
            $newTH.text(item);

            mix += $newTH[0].outerHTML
        });

        $jqDataTable.find("thead tr").empty();
        $jqDataTable.find("thead tr").append(mix);

        //回寫到TEMPLATE
        var $content = $($("." + selectorID).prop('content'));
        $content.find(".singleSelector").empty()
        $content.find(".singleSelector").append($jqDataTable[0].outerHTML);
    }
}

//部門選擇器
function deptSelector() {
    var selectorID = "deptSelector";
    var $temp = commonManager.getTemplate("." + selectorID);
    var thLsit = ["部門代碼", "部門名稱"];

    if ($(".deptSelector_EN").length > 0) {
        deptSelector_EN = true;
        selectorID = "deptSelector_EN";
        $temp = commonManager.getTemplate("." + selectorID);
        thLsit = ["Department code", "Department name"];
    }

    //console.log("lang", lang);
    //判斷是否有引用
    if ($temp.length > 0) {
        deptSelectorEnable = true;
        var $jqDataTable = $temp.find(".jqDataTable_" + selectorID);
        var $th = $jqDataTable.find("thead th:eq(0)");
        var mix = '';

        thLsit.forEach(function (item, i) {
            var $newTH = $th.clone();
            $newTH.text(item);

            mix += $newTH[0].outerHTML
        });

        $jqDataTable.find("thead tr").empty();
        $jqDataTable.find("thead tr").append(mix);

        //回寫到TEMPLATE
        var $content = $($("." + selectorID).prop('content'));
        $content.find(".singleSelector").empty()
        $content.find(".singleSelector").append($jqDataTable[0].outerHTML);
    }
}