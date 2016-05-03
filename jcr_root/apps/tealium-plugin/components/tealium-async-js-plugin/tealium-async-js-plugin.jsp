<%@include file="/libs/foundation/global.jsp"%>
<%@page session="false" %>
<cq:includeClientLib categories="tealium.plugin"/>

<jsp:useBean id="componentBean" scope="page" class="com.tealium.jsp.components.TealiumConfigurationComponentBean" />
<jsp:setProperty name="componentBean" property="request" value="<%=slingRequest%>" />
<jsp:setProperty name="componentBean" property="pageProperties" value="<%=pageProperties%>"/>

<c:if test="${componentBean.enabled}">
    <div data-tealium-enabled-utag-js='${componentBean.enabledUtagSyncJs}'
        data-tealium-enabled-custom-udo='${componentBean.enabledCustomUDO}'
        data-tealium-account-information='${componentBean.tealiumAccountInformation}'
        data-tealium-page-path='${currentPage.contentResource.path}'
        data-tealium-utag-data='${componentBean.filledUtagData}'>
    </div>
</c:if>

<cq:includeClientLib categories="cq.tealium.async.js.plugin"/>