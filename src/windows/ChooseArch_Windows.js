/******************************************************************************
"Copyright (c) 2015-2015, Intel Corporation
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.
3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this
    software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
"
******************************************************************************/
var fs = require('fs');

fs.mkdirSync("plugins");
fs.mkdirSync("plugins/com.intel.security/");
fs.mkdirSync("plugins/com.intel.security/win8");
fs.mkdirSync("plugins/com.intel.security/win10");
fs.mkdirSync("plugins/com.intel.security/win8/x86");
fs.mkdirSync("plugins/com.intel.security/win8/x64");
fs.mkdirSync("plugins/com.intel.security/win8/arm");
fs.mkdirSync("plugins/com.intel.security/win10/x86");
fs.mkdirSync("plugins/com.intel.security/win10/x64");
fs.mkdirSync("plugins/com.intel.security/win10/arm");

copyFilesIntoProject();

var solutionFile2012 = 'CordovaApp.vs2012.sln';
var solutionFile2015 = 'CordovaApp.sln';
var projectFile80 = 'CordovaApp.Windows80.jsproj';
var projectFile10 = 'CordovaApp.Windows10.jsproj';
var projectFile81 = 'CordovaApp.Windows.jsproj';

defineArchSLN(solutionFile2012);
defineArchSLN(solutionFile2015);
fixProjectFile8(projectFile80);
fixProjectFile81(projectFile81);
fixProjectFile10(projectFile10);

console.log("Fixed!");

function copyFilesIntoProject() {
    // copy dll & winmd & files
    // and for Intel platform copy the .vp and .sb	
    var winNames = ['win8', 'win10'];
    var archNames = ['x86', 'x64', 'arm'];
    for (var k = 0; k < winNames.length; k++) {
        for (var j = 0; j < archNames.length; j++) {
            var srcPath = '../../plugins/com.intel.security/src/windows/' + winNames[k] + '/' + archNames[j] + '/';
            var dstPath = 'plugins/com.intel.security/' + winNames[k] + '/' + archNames[j] + '/';
            var dllFilesName = ['IntelSecurityServicesWRC.dll', 'IntelSecurityServicesWRC.winmd'];

            for (var i = 0; i < dllFilesName.length; i++) {
                var file = dllFilesName[i];
                copyFile(srcPath + file, dstPath + file);
            }
        }
    }
}

function copyFile(sourceFile, targetFile) {
    if (fs.existsSync(sourceFile)) {
        if (fs.existsSync(targetFile)) {
            fs.unlinkSync(targetFile);
        }
        fs.createReadStream(sourceFile).pipe(fs.createWriteStream(targetFile));
    } else {
        console.log('error:, ' + sourceFile + ' does not exist. Exiting');
    }
}

function defineArchSLN(fileName) {
    fs.readFile(fileName, 'utf8',
        function(err, data) {
            if (!err) {
                var newData = data.replace(/({[\dA-F\-]*}.(Debug|Release)\|.*\s=\s(Debug|Release))\|Any CPU/g, "$1|" + "x86");
                fs.writeFileSync(fileName, newData);
            }
        });
}

function fixProjectFile8(fileName) {
    fs.readFile(fileName, 'utf8',
        function(err, data) {
            if (!err) {
                var newData = data.replace("</Project>",
                    "\t<ItemGroup>" +
                    "\n\t\t<SDKReference Include=\"Microsoft.VCLibs, Version=11.0\" />" +
                    "\n\t</ItemGroup>" +
                    "\n\t<ItemGroup Condition=\"'$(Platform)' == 'x86'\">" +
                    "\n\t\t<Reference Include=\"IntelSecurityServicesWRC\">" +
                    "\n\t\t\t<HintPath>plugins\\com.intel.security\\win8\\x86\\IntelSecurityServicesWRC.winmd</HintPath>" +
                    "\n\t\t\t<IsWinMDFile>true</IsWinMDFile>" +
                    "\n\t\t</Reference>" +
                    "\n\t</ItemGroup>" +
                    "\n\t<ItemGroup Condition=\"'$(Platform)' == 'x64'\">" +
                    "\n\t\t<Reference Include=\"IntelSecurityServicesWRC\">" +
                    "\n\t\t\t<HintPath>plugins\\com.intel.security\\win8\\x64\\IntelSecurityServicesWRC.winmd</HintPath>" +
                    "\n\t\t\t<IsWinMDFile>true</IsWinMDFile>" +
                    "\n\t\t</Reference>" +
                    "\n\t</ItemGroup>" +
                    "\n\t<ItemGroup Condition=\"'$(Platform)' == 'ARM'\">" +
                    "\n\t\t<Reference Include=\"IntelSecurityServicesWRC\">" +
                    "\n\t\t\t<HintPath>plugins\\com.intel.security\\win8\\ARM\\IntelSecurityServicesWRC.winmd</HintPath>" +
                    "\n\t\t\t<IsWinMDFile>true</IsWinMDFile>" +
                    "\n\t\t</Reference>" +
                    "\n\t</ItemGroup>" +
                    "\n</Project>"
                );
                fs.writeFileSync(fileName, newData);
            }
        });
}

function fixProjectFile81(fileName) {
    fs.readFile(fileName, 'utf8',
        function(err, data) {
            if (!err) {
                var newData = data.replace("</Project>",
                    "\t<ItemGroup>" +
                    "\n\t\t<SDKReference Include=\"Microsoft.VCLibs, Version=11.0\" />" +
                    "\n\t</ItemGroup>" +
                    "\n\t<ItemGroup Condition=\"'$(Platform)' == 'x86'\">" +
                    "\n\t\t<Reference Include=\"IntelSecurityServicesWRC\">" +
                    "\n\t\t\t<HintPath>plugins\\com.intel.security\\win8\\x86\\IntelSecurityServicesWRC.winmd</HintPath>" +
                    "\n\t\t\t<IsWinMDFile>true</IsWinMDFile>" +
                    "\n\t\t</Reference>" +
                    "\n\t</ItemGroup>" +
                    "\n\t<ItemGroup Condition=\"'$(Platform)' == 'x64'\">" +
                    "\n\t\t<Reference Include=\"IntelSecurityServicesWRC\">" +
                    "\n\t\t\t<HintPath>plugins\\com.intel.security\\win8\\x64\\IntelSecurityServicesWRC.winmd</HintPath>" +
                    "\n\t\t\t<IsWinMDFile>true</IsWinMDFile>" +
                    "\n\t\t</Reference>" +
                    "\n\t</ItemGroup>" +
                    "\n\t<ItemGroup Condition=\"'$(Platform)' == 'ARM'\">" +
                    "\n\t\t<Reference Include=\"IntelSecurityServicesWRC\">" +
                    "\n\t\t\t<HintPath>plugins\\com.intel.security\\win8\\ARM\\IntelSecurityServicesWRC.winmd</HintPath>" +
                    "\n\t\t\t<IsWinMDFile>true</IsWinMDFile>" +
                    "\n\t\t</Reference>" +
                    "\n\t</ItemGroup>" +
                    "\n</Project>"
                );
                newData = newData.replace("<OutputPath>build\\windows",
                    "<OutputPath>build\\windows81"
                );
                fs.writeFileSync(fileName, newData);
            }
        });
}

function fixProjectFile10(fileName) {
    fs.readFile(fileName, 'utf8',
        function(err, data) {
            if (!err) {
                var newData = data.replace("</Project>",
                    "\n\t<ItemGroup Condition=\"'$(Platform)' == 'x86'\">" +
                    "\n\t\t<Reference Include=\"IntelSecurityServicesWRC\">" +
                    "\n\t\t\t<HintPath>plugins\\com.intel.security\\win10\\x86\\IntelSecurityServicesWRC.winmd</HintPath>" +
                    "\n\t\t\t<IsWinMDFile>true</IsWinMDFile>" +
                    "\n\t\t</Reference>" +
                    "\n\t</ItemGroup>" +
                    "\n\t<ItemGroup Condition=\"'$(Platform)' == 'x64'\">" +
                    "\n\t\t<Reference Include=\"IntelSecurityServicesWRC\">" +
                    "\n\t\t\t<HintPath>plugins\\com.intel.security\\win10\\x64\\IntelSecurityServicesWRC.winmd</HintPath>" +
                    "\n\t\t\t<IsWinMDFile>true</IsWinMDFile>" +
                    "\n\t\t</Reference>" +
                    "\n\t</ItemGroup>" +
                    "\n\t<ItemGroup Condition=\"'$(Platform)' == 'ARM'\">" +
                    "\n\t\t<Reference Include=\"IntelSecurityServicesWRC\">" +
                    "\n\t\t\t<HintPath>plugins\\com.intel.security\\win10\\ARM\\IntelSecurityServicesWRC.winmd</HintPath>" +
                    "\n\t\t\t<IsWinMDFile>true</IsWinMDFile>" +
                    "\n\t\t</Reference>" +
                    "\n\t</ItemGroup>" +
                    "\t<ItemGroup>" +
                    "\n\t\t<SDKReference Include=\"Microsoft.VCLibs, Version=14.0\" />" +
                    "\n\t</ItemGroup>" +
                    "\n</Project>"
                );
                newData = newData.replace("<OutputPath>build\\windows",
                    "<OutputPath>build\\windows10"
                );
                fs.writeFileSync(fileName, newData);
            }
        });
}
