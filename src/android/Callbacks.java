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

package com.intel.security;

import android.util.Log;
import android.content.Context;
import android.provider.Settings;
import android.content.res.AssetManager;
import java.io.InputStream;
import java.io.IOException;

public class Callbacks {
    
    public Callbacks(){} ;
    public String getAppData(String DataID)
    {
		if(DataID==null)
        {
            return new String("") ;
        }
        Services instance = Services.getInstance() ;
        if(instance==null)
        {
            return new String("") ;
        }
        Context mContext=instance.GetSserviceContext() ;
        if ( DataID.equals("AppName") )
        {
            return mContext.getPackageName() ;
        }
        if ( DataID.equals("AndroidID"))
        {
            return  Settings.Secure.getString(mContext.getContentResolver(),Settings.Secure.ANDROID_ID);
        }
        if ( DataID.equals("AndroidVersion"))
        {
            return Integer.toString(android.os.Build.VERSION.SDK_INT) ;
        }
        return java.util.UUID.randomUUID().toString() ;
    }
    public String getInternalPath()
    {
        Services instance = Services.getInstance() ;
        if(instance==null)
        {
            return new String("") ;
        }
        Context mContext=instance.GetSserviceContext() ;
        return mContext.getFilesDir().toString();
    }
	
	public byte[] getAssetBuffer(String file, int bufferSize)
    {	
        if(file==null)
        {
            return null ;
        }
		try {
			Services instance = Services.getInstance() ;        		
			Context mContext=instance.GetSserviceContext() ;
			AssetManager assetManager = mContext.getAssets();
			InputStream input = assetManager.open(file);
			int size = input.available();
			byte[] buffer = null;
			if (size == bufferSize)
			{			
				buffer = new byte[size];
				input.read(buffer);
			}			
			return buffer;
		} catch (IOException e){
			return null;
		} catch (Exception e) {
			return null;            
        }		
    }
	
	public int getAssetBufferSize(String file)
    {		
	    if(file==null)
        {
            return 0;
        }
		try {
			Services instance = Services.getInstance() ;
			Context mContext=instance.GetSserviceContext() ;			
			AssetManager assetManager = mContext.getAssets();
			InputStream input = assetManager.open(file);			
			int size = input.available();
			input.close();
			return size;
		} catch (IOException e){
			return 0;
		} catch (Exception e) {
			return 0;            
        }
    }

    
	
}
